from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.utils.decorators import method_decorator
from django.views import View
import json
from rest_framework import permissions

@method_decorator(csrf_exempt, name='dispatch')
class CheckUserView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            user = authenticate(request, username=email, password=password)
            if user is not None:
                return JsonResponse({'exists': True}, status=200)
            else:
                return JsonResponse({'exists': False}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

from django.http import JsonResponse
from django.db import connection

def get_products(request):
    data = {
        'electronics': list(fetch_table_data('accounts_electronics')),
        'decorations': list(fetch_table_data('accounts_decorations')),
        'clothing': list(fetch_table_data('accounts_clothing')),
    }
    return JsonResponse(data)



def fetch_table_data(table_name):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT id, url, name, price, quantity FROM {table_name}")
        rows = cursor.fetchall()

    # Convert query results into a list of dicts
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in rows
    ]
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Cart  # Import the Cart model

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Cart  # Import the Cart model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Cart  # Import the Cart model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Cart  # Import the Cart model

@csrf_exempt
def add_to_cart(request):
    if request.method == 'POST':
        try:
            # Parse the JSON request body
            data = json.loads(request.body)  # Assuming you're sending data via form POST

            # Extract data from the parsed JSON
            user_email = data.get('user_email')
            category = data.get('category')
            product_id = int(data.get('product_id'))  # Convert to integer
            quantity = int(data.get('quantity', 1))  # Convert to integer; default quantity is 1

            # Check for null or empty values
            if None in [user_email, category] or '' in [user_email, category]:
                return JsonResponse({'error': 'Missing required fields.'}, status=400)

            # Ensure quantity is a valid integer
            if quantity <= 0:
                return JsonResponse({'error': 'Invalid quantity.'}, status=400)

            # Check if the cart item already exists for the user and product
            existing_cart_item = Cart.objects.filter(user_email=user_email, product_id=product_id,category=category).first()

            if existing_cart_item:
                # Update the quantity of the existing cart item
                existing_cart_item.quantity += quantity
                existing_cart_item.save()
                return JsonResponse({'message': 'Quantity updated in cart successfully.'}, status=200)
            else:
                # Create a new cart item
                cart_item = Cart.objects.create(
                    user_email=user_email,
                    category=category,
                    product_id=product_id,
                    quantity=quantity
                )
                return JsonResponse({'message': 'Item added to cart successfully.'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)


from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf_token(request):
    # Get the CSRF token
    csrf_token = get_token(request)
    
    # Create a JSON response with the CSRF token
    response_data = {
        'csrf_token': csrf_token,
    }
    
    return JsonResponse(response_data)


from django.db import transaction

@csrf_exempt
def delete_from_cart(request):
    if request.method == 'POST':
        try:
            with transaction.atomic():
                # Parse the JSON request body
                data = json.loads(request.body)

                # Extract data from the parsed JSON
                user_email = data.get('user_email')
                product_id = int(data.get('product_id'))  # Convert to integer
                category = data.get('category')

                # Check for null or empty values
                if None in [user_email] or '' in [user_email]:
                    return JsonResponse({'error': 'Missing required fields.'}, status=400)

                # Delete the item from the cart based on user email and product ID
                deleted_items_count = Cart.objects.filter(user_email=user_email, product_id=product_id,category=category).delete()

                if deleted_items_count[0] > 0:
                    return JsonResponse({'message': 'Item deleted from cart successfully.'}, status=200)
                else:
                    return JsonResponse({'error': 'Item not found in cart.'}, status=404)
        except Exception as e:
            transaction.rollback()
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Cart  # Import the Cart model
from django.db import transaction

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Cart  # Import the Cart model
from django.db import transaction

@csrf_exempt
def delete_one_from_cart(request):
    if request.method == 'POST':
        try:
            with transaction.atomic():
                # Parse the JSON request body
                data = json.loads(request.body)

                # Extract data from the parsed JSON
                user_email = data.get('user_email')
                product_id = int(data.get('product_id'))  # Convert to integer
                category = data.get('category')

                # Check for null or empty values
                if None in [user_email] or '' in [user_email]:
                    return JsonResponse({'error': 'Missing required fields.'}, status=400)

                # Find the item in the cart based on user email and product ID
                try:
                    cart_item = Cart.objects.get(user_email=user_email, product_id=product_id,category=category)
                except Cart.DoesNotExist:
                    return JsonResponse({'error': 'Item not found in cart.'}, status=404)

                # Decrease the quantity by 1 and delete if quantity becomes 0
                if cart_item.quantity > 1:
                    cart_item.quantity -= 1
                    cart_item.save()
                else:
                    cart_item.delete()

                return JsonResponse({'message': 'Item quantity updated in cart.'}, status=200)
        except Exception as e:
            transaction.set_rollback(True)
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)



@csrf_exempt
def get_cart_quantity(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            user_email = data.get('user_email')
            product_id = int(data.get('product_id'))  # Convert to integer
            category = data.get('category')

            
            if None in [user_email, product_id] or '' in [user_email, product_id]:
                return JsonResponse({'error': 'Missing required parameters.'}, status=400)

            
            try:
                cart_item = Cart.objects.get(user_email=user_email, product_id=product_id,category=category)
                quantity = cart_item.quantity
                return JsonResponse({'quantity': quantity}, status=200)
            except Cart.DoesNotExist:
                return JsonResponse({'quantity': 0}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed.'}, status=405)
    

from django.http import JsonResponse
from .models import Cart  # Import the Cart model
@csrf_exempt
def get_cart_items_info(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_email = data.get('user_email')

            if not user_email:
                return JsonResponse({'error': 'User email is required.'}, status=400)

            # Query the Cart model to get items for the user
            cart_items = Cart.objects.filter(user_email=user_email)

            # Prepare the response data
            cart_info = []
            for cart_item in cart_items:
                cart_info.append({
                    'product_id': cart_item.product_id,
                    'category': cart_item.category,
                    'quantity': cart_item.quantity,
                })

            return JsonResponse({'cart_items_info': cart_info}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Electronics, Clothing, Decorations
from django.db import transaction

@csrf_exempt
def get_product_info(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product_id = data.get('product_id')
            category = data.get('category')

            if not product_id or not category:
                return JsonResponse({'error': 'Missing required parameters.'}, status=400)

            product_info = {}

            if category == 'electronics':
                with transaction.atomic():
                    product = Electronics.objects.select_for_update().filter(id=product_id).first()
                    if product:
                        product_info['name'] = product.name
                        product_info['url'] = product.url
                        product_info['quantity'] = product.quantity
                        product_info['price'] = product.price
            elif category == 'clothing':
                with transaction.atomic():
                    product = Clothing.objects.select_for_update().filter(id=product_id).first()
                    if product:
                        product_info['name'] = product.name
                        product_info['url'] = product.url
                        product_info['quantity'] = product.quantity
                        product_info['price'] = product.price
            elif category == 'decorations':
                with transaction.atomic():
                    product = Decorations.objects.select_for_update().filter(id=product_id).first()
                    if product:
                        product_info['name'] = product.name
                        product_info['url'] = product.url
                        product_info['quantity'] = product.quantity
                        product_info['price'] = product.price
            else:
                return JsonResponse({'error': 'Invalid category.'}, status=400)

            if product_info:
                return JsonResponse(product_info, status=200)
            else:
                return JsonResponse({'error': 'Product not found.'}, status=404)

        except Exception as e:
            transaction.rollback()
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Electronics, Clothing, Decorations
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Electronics, Clothing, Decorations  # Import the models
from django.db import transaction

@csrf_exempt
def add_item(request):
    if request.method == 'POST':
        try:
            with transaction.atomic():
                # Parse the JSON request body
                data = json.loads(request.body)

                # Extract data from the parsed JSON
                url = data.get('url')
                name = data.get('name')
                price = data.get('price')
                quantity = data.get('quantity')
                item_type = data.get('item_type')  # Assuming this field specifies Electronics/Clothing/Decorations
                what = data.get('what')

                # Check for null or empty values
                if None in [url, name, price, quantity, item_type] or '' in [url, name, item_type]:
                    return JsonResponse({'error': 'Missing required fields.'}, status=400)

                # Ensure quantity and price are valid
                quantity = int(quantity) if quantity.isdigit() else None
                price = float(price) if isinstance(price, (int, float, str)) else None

                if quantity is None or price is None or quantity <= 0 or price <= 0:
                    return JsonResponse({'error': 'Invalid quantity or price.'}, status=400)

                # Determine the model class based on item_type
                if item_type == 'electronics':
                    model_class = Electronics
                    item = model_class.objects.create(
                        url=url,
                        name=name,
                        price=price,
                        quantity=quantity,
                        what=what
                    )
                elif item_type == 'clothing':
                    model_class = Clothing
                    item = model_class.objects.create(
                        url=url,
                        name=name,
                        price=price,
                        quantity=quantity,
                        whom=what
                    )
                elif item_type == 'decorations':
                    model_class = Decorations
                    item = model_class.objects.create(
                        url=url,
                        name=name,
                        price=price,
                        quantity=quantity,
                        what=what
                    )
                else:
                    return JsonResponse({'error': 'Invalid item type.'}, status=400)

                item.save()

                return JsonResponse({'message': f'Item added to {item_type} successfully.'}, status=201)
        except Exception as e:
            transaction.set_rollback(True)
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)

    
from .models import Admin

@csrf_exempt
def add_admin(request):
    if request.method == 'POST':
        try:
            # Parse the JSON request body
            data = json.loads(request.body)

            # Extract data from the parsed JSON
            firstname = data.get('firstname')
            lastname = data.get('lastname')
            email = data.get('email')
            phoneno = data.get('phoneno')
            streetno = data.get('streetno')
            state = data.get('state')
            pincode = data.get('pincode')
            password = data.get('password')

            # Check for null or empty values
            if None in [firstname, lastname, email, phoneno, streetno,state,pincode,password] or '' in [firstname, lastname, email, phoneno, streetno,state,pincode,password]:
                return JsonResponse({'error': 'Missing required fields.'}, status=400)



            model_class = Admin
            item = model_class.objects.create(
                firstname=firstname,
                lastname=lastname,
                email=email,
                phoneno=phoneno,
                streetno=streetno,
                state=state,
                pincode=pincode,
                password=password
            )
            item.save()

            # Save the item to the database
            

            return JsonResponse({'message': f'Item added to Admin successfully.'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)
    
    
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Admin  # Import the Admin model
import json

@csrf_exempt
def get_admin_id(request):
    if request.method == 'POST':
        try:
            # Parse the JSON request body
            data = json.loads(request.body)

            # Extract email from the parsed JSON
            email = data.get('email')
            password=data.get('password')

            # Check for null or empty email
            if not email:
                return JsonResponse({'error': 'Email is required.'}, status=400)

            # Query the Admin model to get the admin id
            admin = Admin.objects.filter(email=email,password=password).first()

            if admin:
                return JsonResponse({'admin_id': admin.id}, status=200)
            else:
                return JsonResponse({'admin_id': 0}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Electronics, Clothing, Decorations
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Electronics, Clothing, Decorations

@csrf_exempt
def change_product_quantity(request):
    if request.method == 'POST':
        try:
            # Parse the JSON request body
            data = json.loads(request.body)

            # Extract data from the parsed JSON
            product_id = data.get('product_id')
            category = data.get('category')
            new_quantity = data.get('new_quantity')

            # Check for null or empty values
            if None in [product_id, category, new_quantity] or '' in [product_id, category, new_quantity]:
                return JsonResponse({'error': 'Missing required fields.'}, status=400)

            # Ensure new_quantity is a valid integer
            if not str(new_quantity).isdigit() or int(new_quantity) < 0:
                return JsonResponse({'error': 'Invalid new quantity.'}, status=400)

            # Determine the model class based on the category
            if category == 'electronics':
                model_class = Electronics
            elif category == 'clothing':
                model_class = Clothing
            elif category == 'decorations':
                model_class = Decorations
            else:
                return JsonResponse({'error': 'Invalid category.'}, status=400)

            with transaction.atomic():
                # Find the product based on product_id and category
                product = model_class.objects.select_for_update().filter(id=product_id).first()

                if product:
                    if int(new_quantity) == 0:
                        # Remove the product from the database
                        product.delete()
                        
                        return JsonResponse({'message': 'Product removed successfully.'}, status=200)
                    else:
                        # Update the quantity of the product
                        product.quantity = new_quantity
                        product.save()
                        
                        return JsonResponse({'message': 'Product quantity updated successfully.'}, status=200)
                else:
                    return JsonResponse({'error': 'Product not found.'}, status=404)

        except Exception as e:
            # Rollback the transaction in case of an exception
            transaction.rollback()
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Electronics, Clothing, Decorations


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Electronics, Clothing, Decorations
from django.db import transaction

@csrf_exempt
def change_product_price(request):
    if request.method == 'POST':
        try:
            # Parse the JSON request body
            data = json.loads(request.body)

            # Extract data from the parsed JSON
            product_id = data.get('product_id')
            category = data.get('category')
            new_price = data.get('new_price')

            # Check for null or empty values
            if None in [product_id, category, new_price] or '' in [product_id, category, new_price]:
                return JsonResponse({'error': 'Missing required fields.'}, status=400)

            # Ensure new_price is a valid float
            new_price = float(new_price) if isinstance(new_price, (int, float, str)) else None

            if new_price is None or new_price <= 0:
                return JsonResponse({'error': 'Invalid new price.'}, status=400)

            # Determine the model class based on the category
            if category == 'electronics':
                model_class = Electronics
            elif category == 'clothing':
                model_class = Clothing
            elif category == 'decorations':
                model_class = Decorations
            else:
                return JsonResponse({'error': 'Invalid category.'}, status=400)

            with transaction.atomic():
                
                product = model_class.objects.select_for_update().filter(id=product_id).first()

                if product:
                   
                    product.price = new_price
                    product.save()
                    
                    return JsonResponse({'message': 'Product price updated successfully.'}, status=200)
                else:
                    return JsonResponse({'error': 'Product not found.'}, status=404)

        except Exception as e:
            # Rollback the transaction in case of an exception
            transaction.rollback()
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)


from django.db import transaction
from django.http import JsonResponse

from django.db import transaction
from django.http import JsonResponse
from .models import Cart, Purchases

from django.db import transaction
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Cart, Purchases, Electronics, Clothing, Decorations
import json
from django.db import transaction
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Cart, Purchases, Electronics, Clothing, Decorations
import json

@csrf_exempt
def remove_product_quantity(request):
    if request.method == 'POST':
        try:
            # Parse the JSON request body
            data = json.loads(request.body)
            user_email = data.get('user_email')
            cart_items = Cart.objects.filter(user_email=user_email)

            with transaction.atomic():
                for cart_item in cart_items:
                    product_id = cart_item.product_id
                    category = cart_item.category
                    quantity = cart_item.quantity

                    # Check for null or empty values
                    if None in [product_id, category, quantity] or '' in [product_id, category, quantity]:
                        return JsonResponse({'error': 'Missing required fields.'}, status=400)

                    quantity = int(quantity)

                    if quantity <= 0:
                        return JsonResponse({'error': 'Invalid quantity.'}, status=400)

                    if category == 'electronics':
                        model_class = Electronics
                    elif category == 'clothing':
                        model_class = Clothing
                    elif category == 'decorations':
                        model_class = Decorations
                    else:
                        return JsonResponse({'error': 'Invalid category.'}, status=400)

                    product = model_class.objects.select_for_update().filter(id=product_id).first()

                    if product:
                        if product.quantity >= quantity:
                            product.quantity -= quantity
                            product.save()
                            if product.quantity == 0:
                                product.delete()

                            # Add purchase details to Purchases table
                            purchase = Purchases.objects.create(
                                user_email=user_email,
                                product_id=product_id,
                                category=category,
                                quantity=quantity
                            )
                            cart_item.delete()
                        else:
                            return JsonResponse({'error': 'Not enough quantity available for product with ID {} in category {}.'.format(product_id, category)}, status=400)
                    else:
                        return JsonResponse({'error': 'Product with ID {} in category {} not found.'.format(product_id, category)}, status=404)

            # If everything goes well, commit the transaction
            transaction.commit()
            return JsonResponse({'message': 'Transaction completed successfully.'}, status=200)

        except Exception as e:
            # If there's an error, rollback the transaction
            transaction.rollback()
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)


@csrf_exempt
def rollback_transaction(request):
    try:
        # Rollback the transaction
        transaction.rollback()
        return JsonResponse({'message': 'Transaction rolled back successfully.'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
def commit_transaction(request):
    if request.method == 'POST':
        try:
            with transaction.atomic():
                # Execute remove_product_quantity function within the same transaction
                remove_product_quantity_response = remove_product_quantity(request)
                remove_product_quantity_response_data = json.loads(remove_product_quantity_response.content)

                # If remove_product_quantity was successful, commit the transaction
                if remove_product_quantity_response.status_code == 200:
                    transaction.commit()
                    return JsonResponse({'message': 'Transaction committed successfully.'}, status=200)
                else:
                    # If remove_product_quantity failed, rollback the transaction
                    transaction.rollback()
                    return remove_product_quantity_response

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)
    
    
    

