import factory
from payments.models import Bill
from projects.factories import ProjectFactory, MilestoneFactory, TaskFactory  # Usamos factories existentes
from users.factories import UserFactory  # Suponiendo que tienes esta factory

class BillFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Bill

    name = factory.Faker('word')
    project = factory.SubFactory(ProjectFactory)
    milestone = factory.SubFactory(MilestoneFactory)
    task = factory.SubFactory(TaskFactory)
    task_price = factory.Faker('pydecimal', left_digits=4, right_digits=2, positive=True)

    # Agregar usuarios relacionados
    @factory.post_generation
    def users(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for user in extracted:
                self.users.add(user)
