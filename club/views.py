from django.shortcuts import render
from .models import Book, Reader, Season, Team
from datetime import date, timedelta
import math


def index(request):
    # get data from db
    query_team = "Kernovi"
    active_season = 2021
    query_season = Season.objects.filter(team__team_name=query_team).filter(
        season_name=active_season
    )
    query_readers = Reader.objects.filter(
        team__team_name__contains=query_team
    ).distinct()
    query_books = (
        Book.objects.filter(reader__in=query_readers)
        .filter(
            date_read__gte=query_season[0].season_start,
            date_read__lte=query_season[0].season_end,
        )
        .order_by("date_read")
    )

    books = []
    readers_dict = []
    books_per_reader = []
    readers_cumulative = []

    # get correct order months in a season
    num_months = (
        (query_season[0].season_end.year - query_season[0].season_start.year) * 12
        + (query_season[0].season_end.month - query_season[0].season_start.month)
        + 1
    )

    month = query_season[0].season_start
    month_counter = 1  # this adds one month to get end month in range
    months_dict = [
        0,  # for counting months 1-12
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Maj",
        "Jun",
        "Jul",
        "Avg",
        "Sept",
        "Okt",
        "Nov",
        "Dec",
    ]
    season_months_numbers = []
    season_months_names = []

    while month_counter <= num_months:
        season_months_numbers.append([month.month, month.year])
        season_months_names.append(
            str(months_dict[month.month]) + "-" + str(month.year)
        )
        month += timedelta(days=30)
        month_counter += 1

    # goals for the season
    # prepare grid-row css dynamically
    goal_per_month_css = "1fr"
    if query_season[0].goal_per_month:
        number_of_rows = math.ceil(num_months / 3)
        rows_counter = 1
        while rows_counter < number_of_rows:
            goal_per_month_css += " 1fr"
            rows_counter += 1

    goals = {
        "goal_per_month": query_season[0].goal_per_month,
        "goal_per_month_no": query_season[0].goal_per_month_no,
        "goal_per_month_css": goal_per_month_css,
        "goal_per_season": query_season[0].goal_per_season,
        "goal_per_season_no": query_season[0].goal_per_season_no,
        "months_in_season": num_months,
        "season_months_names": season_months_names,
        "season_start": query_season[0].season_start,
        "season_end": query_season[0].season_end,
    }

    # readers dict
    for reader in query_readers:
        readers_dict.append(
            {
                "reader_id": reader.id,
                "reader": reader.name,
                "started_reading": reader.started_reading,
                "color": reader.color,
            }
        )

    # books dict
    for book in query_books:
        books.append(
            {
                "date_read": book.date_read,
                "id": book.id,
                "reader_id": book.reader_id,
                "reader": str(book.reader),
                "author": book.author,
                "name": book.name,
                "pages": book.pages,
                "description": book.description,
            }
        )

    # create readers collection
    date_today = date.today()
    for reader in readers_dict:
        readers_collection = []
        readers_collection_cumulative = []
        reader_pages = 0
        count = 0
        days_from_last_book = 0
        previous_date = date(2000, 1, 1)
        for book in books:
            if book.get("reader_id") == reader.get("reader_id"):
                if count == 0:
                    previous_date = book.get("date_read")
                    days_from_last_book = (
                        book.get("date_read")
                        - reader.get(
                            "started_reading"
                        )  # implement started reading date for accurate AVG
                    ).days
                else:
                    days_from_last_book = (book.get("date_read") - previous_date).days
                count += 1

                previous_date = book.get("date_read")
                reader_pages += book.get("pages")

                readers_collection.append(
                    {
                        "date_read": book.get("date_read"),
                        "id": book.get("id"),
                        "reader_id": book.get("reader_id"),
                        "reader": book.get("reader"),
                        "author": book.get("author"),
                        "name": book.get("name"),
                        "pages": book.get("pages"),
                        "description": book.get("description"),
                        "days_from_last_book": days_from_last_book,
                    }
                )
                readers_collection_cumulative.append(
                    {
                        "date_read": book.get("date_read"),
                        "sum": count,
                    }
                )
        books_per_reader.append(
            {
                "reader_id": reader.get("reader_id"),
                "reader": reader.get("reader"),
                "color": reader.get("color"),
                "books_read": readers_collection,
            }
        )
        # calculate time_avg
        avg_time = 0
        book_counter = 0
        for book in readers_collection:
            avg_time += book.get("days_from_last_book")
            book_counter += 1
        if book_counter > 0:
            calculate_avg = round(avg_time / book_counter, 1)
        else:
            calculate_avg = 0

        # calculate time_min, time_max, time_since_last
        min_time = 0
        max_time = 0
        for book in readers_collection:
            if min_time == 0:
                min_time = book.get("days_from_last_book")
            if max_time == 0:
                max_time = book.get("days_from_last_book")
            if book.get("days_from_last_book") < min_time:
                min_time = book.get("days_from_last_book")
            if book.get("days_from_last_book") > max_time:
                max_time = book.get("days_from_last_book")
        if (count - 1) < 0:
            time_since_last = ""
        else:
            time_since_last = (
                date_today - readers_collection[count - 1].get("date_read")
            ).days

        # per-month view
        readers_month = []
        readers_collection_month_year = []
        # render book spaces for each month in a season - [0,0,0,0...]
        for month in season_months_names:
            readers_collection_month_year.append(0)

        for book in readers_collection:
            month_count = 0
            for month in season_months_numbers:
                if book.get("date_read").month == month[0]:
                    if book.get("date_read").year == month[1]:
                        readers_collection_month_year[month_count] += 1
                month_count += 1
        month_count = 0
        for month in season_months_names:
            readers_month.append(
                {
                    "reader": reader.get("reader"),
                    "month": month,
                    "Knjige": readers_collection_month_year[month_count],
                }
            )
            month_count += 1

        # don't send reader's data if he has no active books in this season
        if len(readers_collection) == 0:
            ""
        else:
            # get readers cumulative data
            readers_cumulative.append(
                {
                    "reader_id": reader.get("reader_id"),
                    "reader": reader.get("reader"),
                    "color": reader.get("color"),
                    "books_read": count,
                    "pages_read": reader_pages,
                    "time_avg": calculate_avg,
                    "time_min": min_time,
                    "time_max": max_time,
                    "time_since_last": time_since_last,
                    "books_per_reader": readers_collection,
                    "books_per_reader_cumulative": readers_collection_cumulative,
                    "books_per_reader_month": readers_month,
                    "books_per_reader_month_array": readers_collection_month_year,
                }
            )

    # books per date
    date_book_current = query_season[0].season_start
    date_diff = (date_today - date_book_current).days
    date_counter = 0
    books_per_date = []
    cumulative_sum = 0
    readers_start_date = []
    sum_daily = []
    for reader in readers_dict:  # get diff for start date "null"
        readers_start_date.append(
            [
                reader.get("reader"),
                (reader.get("started_reading") - date_book_current).days,
            ]
        )
    while date_counter <= date_diff:
        book_date = []
        book_counter = 0
        for book in books:
            if date_book_current == book.get("date_read"):
                book_date.append(book)
                book_counter += 1
                cumulative_sum += 1
        books_per_date.append(
            {
                "day": date_counter,
                "date": date_book_current,
                "sum_today": book_counter,
                "sum_cumulative": cumulative_sum,
                "books": book_date,
                "reader_books": [],
                "reader_books_cumulative": [],
            }
        )
        # readers per-day rendering
        reader_books = []
        reader_books_cumulative = []
        for reader in readers_dict:
            for start_date in readers_start_date:
                if reader.get("reader") == start_date[0]:
                    if date_counter < start_date[1]:
                        ""  # if user didn't start reading yet, don't show anything
                    else:
                        count_reader_books = 0
                        for book in book_date:
                            if book.get("reader") == reader.get("reader"):
                                count_reader_books += 1
                        # don't send reader's data if he has no active books in this season
                        for reader_cum in readers_cumulative:
                            if reader.get("reader") == reader_cum.get("reader"):
                                reader_books.append(
                                    [reader.get("reader"), count_reader_books]
                                )
                        # cumulative

                        sum_books = 0
                        if len(books_per_date) < 1:
                            ""
                        elif len(books_per_date) < 2:
                            reader_books_cumulative = reader_books
                        else:
                            for book_pd in books_per_date[len(books_per_date) - 2][
                                "reader_books_cumulative"
                            ]:
                                if reader.get("reader") == book_pd[0]:
                                    sum_books = book_pd[1] + count_reader_books

                            # don't send reader's data if he has no active books in this season
                            for reader_cum in readers_cumulative:
                                if reader.get("reader") == reader_cum.get("reader"):
                                    reader_books_cumulative.append(
                                        [reader.get("reader"), sum_books]
                                    )
        # sum line
        reader_books_cumulative.append(["Skupaj", cumulative_sum])

        books_per_date[len(books_per_date) - 1]["reader_books"] = reader_books
        books_per_date[len(books_per_date) - 1][
            "reader_books_cumulative"
        ] = reader_books_cumulative

        date_counter += 1
        date_book_current += timedelta(days=1)

    # add month goal data if there is one
    if goals.get("goal_per_month"):
        active_readers = (
            len(books_per_date[len(books_per_date) - 1].get("reader_books_cumulative"))
            - 1
        )  # get number of readers on the last day
        days_of_season = len(books_per_date)
        day_counter = 0
        starting_month = books_per_date[0].get("date").month
        print(starting_month)
        month_increase = 1
        while day_counter < days_of_season:
            if starting_month != books_per_date[day_counter].get("date").month:
                month_increase += 1
                starting_month = books_per_date[day_counter].get("date").month
                print("new starting month " + str(starting_month))
            books_per_date[day_counter].get("reader_books_cumulative").append(
                [
                    "Mesečni cilj",
                    active_readers * goals.get("goal_per_month_no") * month_increase,
                ]
            )
            books_per_date[day_counter].get("reader_books_cumulative").append(
                [
                    "Cilj sezone",
                    goals.get("goal_per_season_no"),
                ]
            )
            day_counter += 1

    # cumulative books sorted by readers for every day of the season
    books_daily = []
    for day in books_per_date:
        daily_object = {"date": day.get("date")}
        for reader_book in day.get("reader_books_cumulative"):
            daily_object[reader_book[0]] = reader_book[1]
        books_daily.append(daily_object)

    # pack all data to context for json extraction on FE
    all_data = {
        "books": books,
        "books_per_reader": books_per_reader,
        "books_per_date": books_per_date,
        "readers_cumulative": readers_cumulative,
        "readers_dict": readers_dict,
        "books_daily": books_daily,
        "goals": goals,
    }
    context = {"all_data": all_data}

    return render(request, "index.html", {"context": context})