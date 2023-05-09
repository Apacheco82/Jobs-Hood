from api.models.db import db
from datetime import datetime


class Company(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='company')
    address = db.Column(db.String(100), nullable=False)
    province = db.Column(db.String(100), nullable=False)
    cp = db.Column(db.Integer(), nullable=False)
    cif = db.Column(db.String(10), unique=True, nullable=False)
    favs = db.relationship("Favorites", back_populates="company") 
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return  '%r' % self.id #para las relaciones, en lugar de mostrar el id


    def __init__(self, address,province, cp, cif):

        self.address = address
        self.province = province
        self.cp = cp
        self.cif = cif

    def serialize(self):
        return{
        "id" : self.id,
        "address" : self.address,
        "province" : self.province,
        "cp" : self.cp,
        "cif" : self.cif
        }