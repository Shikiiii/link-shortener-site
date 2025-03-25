import re

def validate_name(name):
    if (len(name) < 1 and len(name) > 30):
        return {"success": False, "error": "Name must be between 1 and 30 characters long."}
    
    return {"success": True}

def validate_email(email):
    # regex for validating email
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    
    if not re.match(email_regex, email):
        return {"success": False, "error": "Invalid email format."}
    
    return {"success": True}

def validate_passwords(password, passwordConfirmation):
    # rules for password:
    # must be at least 8 characters long
    # must contain at least 1 number, 1 uppercase letter
    # password === passwordConfirmation
    
    if len(password) < 8:
        return {"success": False, "error": "Password must be at least 8 characters long."}
    
    if not re.search(r'\d', password):
        return {"success": False, "error": "Password must contain at least one number."}
    
    if not re.search(r'[A-Z]', password):
        return {"success": False, "error": "Password must contain at least one uppercase letter."}
    
    if password != passwordConfirmation:
        return {"success": False, "error": "Passwords do not match."}
    
    return {"success": True}
