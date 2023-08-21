#!/usr/bin/python3
import sys

def print_statistics(total_size, status_counts):
    print("File size:", total_size)
    for status_code in sorted(status_counts.keys()):
        print(f"{status_code}: {status_counts[status_code]}")

def main():
    total_size = 0
    status_counts = {}

    try:
        for line_number, line in enumerate(sys.stdin, start=1):
            try:
                _, _, _, _, _, status_code_str, file_size_str = line.split()
                status_code = int(status_code_str)
                file_size = int(file_size_str)
            except (ValueError, IndexError):
                continue

            total_size += file_size

            if status_code in status_counts:
                status_counts[status_code] += 1
            else:
                status_counts[status_code] = 1

            if line_number % 10 == 0:
                print_statistics(total_size, status_counts)
            
    except KeyboardInterrupt:
        print_statistics(total_size, status_counts)

if __name__ == "__main__":
    main()

