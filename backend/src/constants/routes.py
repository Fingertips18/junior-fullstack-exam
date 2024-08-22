from enum import Enum

class Routes(Enum):
    HOME = "/"
    USERS = "/api/users"
    ITEMS = "/api/items"
    SIGNIN = "/sign-in"
    SIGNUP = "/sign-up"
    REFRESH = "/refresh"