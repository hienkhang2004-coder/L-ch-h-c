#!/usr/bin/env python3
"""
generate_schedule.py — Lịch Học 2022KTT
────────────────────────────────────────
Chuyển đổi dữ liệu lịch học từ CSV/Excel sang schedule.json
để website tự động cập nhật mà không cần sửa code.

Cách dùng:
    python generate_schedule.py input.csv
    python generate_schedule.py input.xlsx
    python generate_schedule.py input.csv --output ../data/schedule.json
"""

import json
import csv
import sys
import os
from datetime import datetime
from pathlib import Path

# ─── Default paths ────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
DEFAULT_OUTPUT = SCRIPT_DIR.parent / "data" / "schedule.json"

# ─── Color palette for subjects ──────────────────────────────────────
ACCENT_COLORS = [
    {"ac": "a1", "hex": "#983514"},
    {"ac": "a2", "hex": "#7a6547"},
    {"ac": "a3", "hex": "#4a7c6b"},
    {"ac": "a4", "hex": "#5a5a8a"},
    {"ac": "a5", "hex": "#8a6020"},
    {"ac": "a6", "hex": "#7a4060"},
    {"ac": "a7", "hex": "#2a6a7a"},
    {"ac": "a8", "hex": "#5a8a3a"},
    {"ac": "a9", "hex": "#8a4a4a"},
]

# ─── Semester metadata ───────────────────────────────────────────────
SEMESTER_INFO = {
    "name": "Kỳ II · 2025–2026",
    "class": "2022KTT",
    "major": "Kiến trúc",
    "school": "Đại học Kiến trúc Hà Nội",
}


def parse_csv(filepath: str) -> list[dict]:
    """
    Parse CSV file with columns:
    Mã MH | Tên MH | Tên đầy đủ | Tín chỉ | Lớp TC | Giảng viên |
    Từ ngày | Đến ngày | Thứ | Tiết | Phòng

    Returns list of subject dicts ready for JSON output.
    """
    subjects = {}
    
    with open(filepath, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            subject_id = row.get("Mã MH", "").strip()
            
            if not subject_id:
                continue
            
            if subject_id not in subjects:
                idx = len(subjects)
                color = ACCENT_COLORS[idx % len(ACCENT_COLORS)]
                subjects[subject_id] = {
                    "id": idx + 1,
                    "ac": color["ac"],
                    "hex": color["hex"],
                    "name": row.get("Tên MH", "").strip(),
                    "full": row.get("Tên đầy đủ", row.get("Tên MH", "")).strip(),
                    "tc": int(row.get("Tín chỉ", 0)),
                    "cls": row.get("Lớp TC", "").strip(),
                    "teacher": row.get("Giảng viên", "—").strip(),
                    "sch": [],
                }
            
            # Add schedule entry
            schedule_entry = {
                "from": row.get("Từ ngày", "").strip(),
                "to": row.get("Đến ngày", "").strip(),
                "thu": int(row.get("Thứ", 2)),
                "tiet": row.get("Tiết", "").strip(),
                "room": row.get("Phòng", "").strip(),
            }
            subjects[subject_id]["sch"].append(schedule_entry)
    
    return list(subjects.values())


def validate_schedule(subjects: list[dict]) -> list[str]:
    """Validate schedule data and return list of warnings."""
    warnings = []
    
    for subj in subjects:
        if not subj["name"]:
            warnings.append(f"[ID={subj['id']}] Thiếu tên môn học")
        
        if subj["tc"] <= 0:
            warnings.append(f"[{subj['name']}] Số tín chỉ không hợp lệ: {subj['tc']}")
        
        for sch in subj["sch"]:
            # Validate date format DD/MM/YYYY
            for date_field in ["from", "to"]:
                try:
                    datetime.strptime(sch[date_field], "%d/%m/%Y")
                except ValueError:
                    warnings.append(
                        f"[{subj['name']}] Ngày không hợp lệ: {sch[date_field]}"
                    )
            
            # Validate thu (2-7 = Mon-Sat, 1 = Sun)
            if sch["thu"] not in range(1, 8):
                warnings.append(
                    f"[{subj['name']}] Thứ không hợp lệ: {sch['thu']}"
                )
    
    return warnings


def generate_json(subjects: list[dict], output_path: str) -> None:
    """Generate schedule.json file."""
    total_credits = sum(s["tc"] for s in subjects)
    
    data = {
        "semester": {
            **SEMESTER_INFO,
            "totalCredits": total_credits,
            "totalSubjects": len(subjects),
        },
        "subjects": subjects,
    }
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Đã tạo {output_path}")
    print(f"  → {len(subjects)} môn học, {total_credits} tín chỉ")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        print("\nVí dụ file CSV:")
        print("Mã MH,Tên MH,Tên đầy đủ,Tín chỉ,Lớp TC,Giảng viên,Từ ngày,Đến ngày,Thứ,Tiết,Phòng")
        print('CT4002,Lịch sử Đảng CSVN,Lịch sử Đảng cộng sản Việt Nam,2,CT4002_2022KTT 1,Phạm Thị Kim Ngân,13/04/2026,24/05/2026,6,1-3,H-H 3.03')
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[3] if len(sys.argv) > 3 and sys.argv[2] == "--output" else str(DEFAULT_OUTPUT)
    
    if not os.path.exists(input_file):
        print(f"✗ Không tìm thấy file: {input_file}")
        sys.exit(1)
    
    ext = os.path.splitext(input_file)[1].lower()
    
    if ext == ".csv":
        subjects = parse_csv(input_file)
    elif ext in (".xlsx", ".xls"):
        try:
            import openpyxl
        except ImportError:
            print("✗ Cần cài openpyxl: pip install openpyxl")
            sys.exit(1)
        # Convert xlsx to CSV first, then parse
        print("✗ Hỗ trợ xlsx đang phát triển. Hãy export sang CSV trước.")
        sys.exit(1)
    else:
        print(f"✗ Định dạng không hỗ trợ: {ext}")
        sys.exit(1)
    
    # Validate
    warnings = validate_schedule(subjects)
    if warnings:
        print(f"\n⚠ {len(warnings)} cảnh báo:")
        for w in warnings:
            print(f"  → {w}")
        print()
    
    # Generate
    generate_json(subjects, output_file)


if __name__ == "__main__":
    main()
