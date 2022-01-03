from django.db import models
from django.core.validators import MaxValueValidator
from django.contrib.auth.models import User

# Create your models here.

genre_choices = (
    ("notspecified", "Not-specified"),
    ("romantic", "Romantic"),
    ("comedy", "Comedy"),
    ("biography", "Biography"),
    ("fantasy", "Fantasy"),
    ("fiction", "Fiction"),
    ("crime", "Crime"),
    ("detective", "Detective/Mysery"),
    ("thriller", "Thriller"),
    ("historica", "Historical"),
    ("politics", "Politics"),
    ("selfimprovement", "Self-improvement"),
    ("business", "Business"),
    ("poetry", "Poetry"),
    ("philosophy", "Philosophy"),
    ("social", "Social"),
    ("studymaterial", "Study materials"),
    ("cookbook", "Cook-book"),
)


class Team(models.Model):
    team_name = models.CharField("Ime ekipe", max_length=20, null=False)

    class Meta:
        verbose_name = "Ekipa"
        verbose_name_plural = "Ekipe"

    def __str__(self):
        return self.team_name


class TeamUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, blank=True, null=True)


class Season(models.Model):
    season_name = models.CharField("Sezona", max_length=20, null=False)
    season_start = models.DateField("Začetek", null=False)
    season_end = models.DateField("Konec", null=False)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    is_active = models.BooleanField("Aktivna", default=True)
    goal_per_month = models.BooleanField("Knjiga na mesec", default=True)
    goal_per_month_no = models.IntegerField(
        "Številko knjig na mesec",
        validators=[MaxValueValidator(10)],
        help_text="1",
        default=0,
        blank=True,
        null=True,
    )
    goal_per_season = models.BooleanField("Številko knjig na sezono", default=False)
    goal_per_season_no = models.PositiveIntegerField(
        "Število knjig na sezono",
        validators=[MaxValueValidator(500)],
        help_text="100",
        default=0,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Sezona"
        verbose_name_plural = "Sezone"

    def __str__(self):
        return self.season_name


class Reader(models.Model):
    name = models.CharField("Ime na grafu", max_length=20, null=False)
    full_name = models.CharField("Polno ime", max_length=40, blank=True, null=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    color = models.CharField("Barva", max_length=7, help_text="#3f51b5", null=False)

    class Meta:
        verbose_name = "Bralec/Bralka"
        verbose_name_plural = "Bralci"

    def __str__(self):
        return self.name


class Book(models.Model):
    reader = models.ForeignKey(Reader, on_delete=models.CASCADE)
    name = models.CharField("Naslov knjige", max_length=80, null=False)
    author = models.CharField("Avtor", max_length=80, null=False)
    genre = models.CharField(
        "Žanr",
        help_text="Izberi žanr knjige",
        max_length=20,
        choices=genre_choices,
        default="notspecified",
    )
    pages = models.IntegerField(
        "Število strani", help_text="298", default=0, blank=False, null=False
    )
    description = models.TextField("Opis knjige", max_length=300, blank=True)
    date_read = models.DateField("Datum", null=False)

    class Meta:
        verbose_name = "Knjiga"
        verbose_name_plural = "Knjige"

    def __str__(self):
        return self.name