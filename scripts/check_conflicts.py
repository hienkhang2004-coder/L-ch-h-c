#!/usr/bin/env python3
"""
check_conflicts.py — Lịch Học 2022KTT
──────────────────────────────────────
Kiểm tra trùng lịch học, phân tích thời khóa biểu,
và thống kê tổng quan về lịch học trong kỳ.

Cách dùng:
    python check_conflicts.py
    python check_conflicts.py --data ../data/schedule.json
    python check_conflicts.py --week 2026-03-02
"""

import json
import sys
import os
from datetime import datetime, timedelta
from pathlib import Path
from collections import defaultdict

# ─── Paths ────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
DEFAULT_DATA = SCRIPT_DIR.parent / "data" / "schedule.json"

# ─── Time slots ──────────────────────────────────────────────────────
PERIOD_TIMES = {
    "1-3":  {"start": "07:00", "end": "09:25", "label": "Tiết 1–3"},
    "2-6":  {"start": "07:30", "end": "11:55", "label": "Tiết 2–6"},
    "4-6":  {"start": "09:35", "end": "11:55", "label": "Tiết 4–6"},
    "10-12": {"start": "15:05", "end": "17:25", "label": "Tiết 10–12"},
}

DAY_NAMES = {1: "Chủ nhật", 2: "Thứ 2", 3: "Thứ 3", 4: "Thứ 4", 5: "Thứ 5", 6: "Thứ 6", 7: "Thứ 7"}


def load_data(path: str) -> dict:
    """Load schedule data from JSON file."""
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def parse_date(date_str: str) -> datetime:
    """Parse DD/MM/YYYY date string."""
    return datetime.strptime(date_str, "%d/%m/%Y")


def get_period_minutes(tiet: str) -> tuple[int, int]:
    """Get start/end minutes from midnight for a period."""
    info = PERIOD_TIMES.get(tiet, {"start": "00:00", "end": "00:00"})
    start_h, start_m = map(int, info["start"].split(":"))
    end_h, end_m = map(int, info["end"].split(":"))
    return start_h * 60 + start_m, end_h * 60 + end_m


def periods_overlap(tiet1: str, tiet2: str) -> bool:
    """Check if two periods overlap in time."""
    s1, e1 = get_period_minutes(tiet1)
    s2, e2 = get_period_minutes(tiet2)
    return s1 < e2 and s2 < e1


def check_conflicts(data: dict) -> list[dict]:
    """
    Find all schedule conflicts (same day, overlapping time, same date range).
    Returns list of conflict descriptions.
    """
    conflicts = []
    subjects = data["subjects"]

    # Build flat list of (subject, schedule_entry) with all active dates
    entries = []
    for subj in subjects:
        for sch in subj["sch"]:
            from_date = parse_date(sch["from"])
            to_date = parse_date(sch["to"])
            entries.append({
                "subj": subj,
                "sch": sch,
                "from": from_date,
                "to": to_date,
                "day": sch["thu"],  # 1=CN, 2-7=T2-T7
                "tiet": sch["tiet"],
            })

    # Check all pairs
    for i in range(len(entries)):
        for j in range(i + 1, len(entries)):
            e1, e2 = entries[i], entries[j]

            # Same day of week?
            if e1["day"] != e2["day"]:
                continue

            # Overlapping date ranges?
            if e1["from"] > e2["to"] or e2["from"] > e1["to"]:
                continue

            # Overlapping time slots?
            if not periods_overlap(e1["tiet"], e2["tiet"]):
                continue

            # Found a conflict!
            overlap_start = max(e1["from"], e2["from"])
            overlap_end = min(e1["to"], e2["to"])

            conflicts.append({
                "subject1": e1["subj"]["name"],
                "subject2": e2["subj"]["name"],
                "day": DAY_NAMES.get(e1["day"], "?"),
                "period1": e1["tiet"],
                "period2": e2["tiet"],
                "room1": e1["sch"]["room"],
                "room2": e2["sch"]["room"],
                "from": overlap_start.strftime("%d/%m/%Y"),
                "to": overlap_end.strftime("%d/%m/%Y"),
            })

    return conflicts


def analyze_workload(data: dict) -> dict:
    """Analyze weekly workload distribution."""
    subjects = data["subjects"]
    day_hours = defaultdict(float)
    day_subjects = defaultdict(set)

    for subj in subjects:
        for sch in subj["sch"]:
            day = sch["thu"]
            start, end = get_period_minutes(sch["tiet"])
            hours = (end - start) / 60
            day_hours[day] += hours
            day_subjects[day].add(subj["name"])

    return {
        "day_hours": dict(day_hours),
        "day_subjects": {k: list(v) for k, v in day_subjects.items()},
    }


def get_week_schedule(data: dict, week_start: datetime) -> dict:
    """Get schedule for a specific week."""
    subjects = data["subjects"]
    week_end = week_start + timedelta(days=6)
    schedule = defaultdict(list)

    for subj in subjects:
        for sch in subj["sch"]:
            from_date = parse_date(sch["from"])
            to_date = parse_date(sch["to"])

            for day_offset in range(7):
                current = week_start + timedelta(days=day_offset)
                js_day = current.weekday()  # 0=Mon
                # Convert to thu format: Mon=2, Tue=3, ..., Sun=1
                thu = js_day + 2 if js_day < 6 else 1

                if thu == sch["thu"] and from_date <= current <= to_date:
                    schedule[current.strftime("%d/%m/%Y")].append({
                        "name": subj["name"],
                        "tiet": sch["tiet"],
                        "room": sch["room"],
                        "time": PERIOD_TIMES.get(sch["tiet"], {}).get("start", "?"),
                    })

    return dict(schedule)


def print_report(data: dict, week_date: str | None = None) -> None:
    """Print comprehensive schedule report."""
    semester = data["semester"]

    print("=" * 60)
    print(f"  📚 BÁO CÁO LỊCH HỌC — {semester['class']}")
    print(f"  {semester['name']} · {semester['school']}")
    print("=" * 60)

    # Basic stats
    print(f"\n📊 TỔNG QUAN:")
    print(f"  • Số môn học: {semester['totalSubjects']}")
    print(f"  • Tổng tín chỉ: {semester['totalCredits']}")

    # Date range
    all_dates = []
    for subj in data["subjects"]:
        for sch in subj["sch"]:
            all_dates.append(parse_date(sch["from"]))
            all_dates.append(parse_date(sch["to"]))

    if all_dates:
        print(f"  • Bắt đầu: {min(all_dates).strftime('%d/%m/%Y')}")
        print(f"  • Kết thúc: {max(all_dates).strftime('%d/%m/%Y')}")
        total_days = (max(all_dates) - min(all_dates)).days
        print(f"  • Thời gian: {total_days} ngày ({total_days // 7} tuần)")

    # Conflicts
    print(f"\n🔍 KIỂM TRA TRÙNG LỊCH:")
    conflicts = check_conflicts(data)
    if conflicts:
        print(f"  ⚠ Phát hiện {len(conflicts)} xung đột:")
        for c in conflicts:
            print(f"  ┌ {c['subject1']} ({c['period1']}) ↔ {c['subject2']} ({c['period2']})")
            print(f"  │ {c['day']}, {c['from']} → {c['to']}")
            print(f"  └ Phòng: {c['room1'] or '—'} / {c['room2'] or '—'}")
    else:
        print("  ✓ Không có xung đột lịch học!")

    # Workload
    print(f"\n📅 PHÂN BỐ LỊCH HỌC:")
    workload = analyze_workload(data)
    for day_num in [2, 3, 4, 5, 6, 7, 1]:
        name = DAY_NAMES[day_num]
        hours = workload["day_hours"].get(day_num, 0)
        subjs = workload["day_subjects"].get(day_num, [])
        bar = "█" * int(hours) + "░" * (6 - int(hours))
        if hours > 0:
            print(f"  {name:>8}: {bar} {hours:.1f}h — {', '.join(subjs)}")
        else:
            print(f"  {name:>8}: {'░' * 6} Nghỉ")

    # Week schedule
    if week_date:
        try:
            week_start = datetime.strptime(week_date, "%Y-%m-%d")
            # Adjust to Monday
            week_start -= timedelta(days=week_start.weekday())
        except ValueError:
            print(f"\n✗ Ngày không hợp lệ: {week_date} (dùng YYYY-MM-DD)")
            return

        print(f"\n📋 LỊCH TUẦN: {week_start.strftime('%d/%m/%Y')} → {(week_start + timedelta(6)).strftime('%d/%m/%Y')}")
        week = get_week_schedule(data, week_start)
        for day_offset in range(7):
            current = week_start + timedelta(days=day_offset)
            date_str = current.strftime("%d/%m/%Y")
            day_name = DAY_NAMES.get(current.weekday() + 2 if current.weekday() < 6 else 1, "?")
            classes = week.get(date_str, [])
            if classes:
                print(f"\n  {day_name} ({date_str}):")
                for c in sorted(classes, key=lambda x: x["time"]):
                    print(f"    {c['time']} │ {c['name']} │ {c['room'] or '—'}")
            else:
                print(f"\n  {day_name} ({date_str}): Nghỉ")

    print("\n" + "=" * 60)


def main():
    data_path = str(DEFAULT_DATA)
    week_date = None

    # Parse args
    args = sys.argv[1:]
    i = 0
    while i < len(args):
        if args[i] == "--data" and i + 1 < len(args):
            data_path = args[i + 1]
            i += 2
        elif args[i] == "--week" and i + 1 < len(args):
            week_date = args[i + 1]
            i += 2
        else:
            i += 1

    if not os.path.exists(data_path):
        print(f"✗ Không tìm thấy file dữ liệu: {data_path}")
        print(f"  Hãy chạy generate_schedule.py trước hoặc kiểm tra đường dẫn.")
        sys.exit(1)

    data = load_data(data_path)
    print_report(data, week_date)


if __name__ == "__main__":
    main()
