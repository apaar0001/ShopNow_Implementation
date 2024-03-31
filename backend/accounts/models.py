from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def full_name(self):
        return self.name

    def short_name(self):
        return self.name

    def __str__(self):
        return self.email




class Product(models.Model):
    CATEGORY_CHOICES = (
        ('electronics', 'Electronics'),
        ('decorations', 'Decorations'),
        ('clothing', 'Clothing'),
    )
    url = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

# models.py
from django.db import models

class Cart(models.Model):
    user_email = models.EmailField()
    category = models.CharField(max_length=100)
    product_id = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()


from django.db import models

class Electronics(models.Model):
    url = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    what = models.CharField(max_length=255)
    quantity = models.IntegerField()

class Clothing(models.Model):
    url = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    whom = models.CharField(max_length=255)
    quantity = models.IntegerField()

class Decorations(models.Model):
    url = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    what = models.CharField(max_length=255)
    quantity = models.IntegerField()

class Admin(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField(max_length=255, unique=True)
    phoneno = models.CharField(max_length=15)
    streetno = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    pincode = models.CharField(max_length=10)
    password = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.firstname} {self.lastname}"
