from django.core.management.base import BaseCommand, CommandError
from utils import fetch_efo_terms


class Command(BaseCommand):
    help = "Fetching EFO Data"

    def add_arguments(self, parser):
        parser.add_argument("max_pages", nargs=1, type=int)

    def handle(self, *args, **options):
        fetch_efo_terms(options['max_pages'])
        self.stdout.write(
            self.style.SUCCESS(f'Successfully downloaded data for {options['max_pages']} pages')
        )