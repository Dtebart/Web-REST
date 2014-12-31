#coding utf-8

import cherrypy
import json
from serverApp import database

#-------------------------------------
class Consumerbasket(object):
#-------------------------------------
    #-------------------------------------
    def __init__(self):
    #-------------------------------------
        self.database_obj = database.Database("data\\consumer-baskets\\")
        self.last_id = self.database_obj.readFile("id")["id"]
    
    #-------------------------------------
    def index(self, *arglist, **kwargs):
    #-------------------------------------
        # Increase next_id value in file
        self.last_id = self.last_id + 1
        id_data = {"id": self.last_id}
        self.database_obj.editFile(id_data, "id")
        
        article_data = cherrypy.request.body.params       
        
        consumerbasket_data = {"id": self.last_id, "articleAmount" : 1, "price": article_data["price"]}
        self.database_obj.insertFile(consumerbasket_data, str(self.last_id))
        
        return str(id_data)
    
    index.exposed = True
    
    #-------------------------------------
    def get_consumerbasket(self, consumerbasket_id):
    #-------------------------------------
        return 0
    
    get_consumerbasket.exposed = True
        
    #-------------------------------------
    def __getattr__(self, name):
    #-------------------------------------
        try:
            name = int(name)
            cherrypy.request.params["consumerbasket_id"] = name
            return self.get_consumerbasket
        except:
            raise AttributeError("%r object has no attribute %r" % (self.__class__.__name__, name))
        
    