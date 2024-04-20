"""auth_system URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from accounts.views import CheckUserView, get_csrf_token  # Adjust the import path to where your CheckUserView is located
# from accounts.views import CategoryView
from accounts.views import get_products
from accounts.views import add_to_cart
from accounts.views import delete_from_cart
from accounts.views import delete_one_from_cart
from accounts.views import get_cart_quantity
from accounts.views import get_cart_items_info
from accounts.views import get_product_info
from accounts.views import add_item
from accounts.views import add_admin
from accounts.views import get_admin_id
from accounts.views import change_product_quantity
from accounts.views import change_product_price
from accounts.views import remove_product_quantity
from accounts.views import rollback_transaction
from accounts.views import commit_transaction

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/check_user/', CheckUserView.as_view(), name='check_user'),  # Add this line for your new endpoint
    path('api/products/', get_products, name='get_products'),
    path('api/add_to_cart/', add_to_cart, name='add_to_cart'),
    path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
    path('api/delete_from_cart/', delete_from_cart, name='delete_from_cart'),
    path('api/delete_one_from_cart/', delete_one_from_cart, name='delete_one_from_cart'),
    path('api/get_cart_quantity/', get_cart_quantity, name='get_cart_quantity'),
    path('api/get_cart_items_info',get_cart_items_info,name='get_cart_items_info'),
    path('api/get_product_info',get_product_info,name='get_product_info'),
    path('api/add_item',add_item,name='add_item'),
    path('auth/add_admin',add_admin,name='add_admin'),
    path('auth/get_admin_id',get_admin_id,name='get_admin_id'),
    path('api/change_product_quantity',change_product_quantity,name='change_product_quantity'),
    path('api/change_product_price',change_product_price,name='change_product_price'),
    path('api/remove_product_quantity',remove_product_quantity,name='remove_product_quantity'),
    path('api/rollback_transaction',rollback_transaction,name='rollback_transaction'),
    path('api/commit_transaction',commit_transaction,name='commit_transaction'),
    
]

# This catch-all pattern should always be at the end
urlpatterns += [
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]

