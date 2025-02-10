from django.core.management.base import BaseCommand, CommandError
from utils import fetch_efo_terms


class Command(BaseCommand):
    help = "Fetching EFO Data"

    def add_arguments(self, parser):
        parser.add_argument("page_no", nargs=1, type=int)

    def handle(self, *args, **options):
        print(options) 
        self.stdout.write(
            self.style.SUCCESS('Successfully closed poll "%s"' % poll_id)
        )