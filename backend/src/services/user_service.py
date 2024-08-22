from src.models.user_model import UserModel
from src.configs.db import db

class UserService:
    @staticmethod
    def get_all():
        return UserModel.query.all()
    
    @staticmethod
    def get(id):
        return UserModel.query.filter_by(id=id).first()
    
    @staticmethod
    def delete(id):
        user = UserService.get(id)

        if user is None:
            return
        
        db.session.delete(user)
        db.session.commit()

        return ''

    @staticmethod
    def signUp(username, email, password):
        user = UserModel(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return user.created_at
    
    @staticmethod
    def signIn(email, password):
        user = UserModel.query.filter_by(email=email).first()

        if user is None:
            return None
        
        if user.check_password(password):
            return user
        else:
            return None