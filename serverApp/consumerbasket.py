#coding utf-8

import cherrypy
import json
import re

from json import encoder
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
        consumerbasket_data = {"id": self.last_id, "articles": {str(article_data["number"]):{"name":article_data["name"], "price":article_data["price"], "quantity": 1}}}
        self.database_obj.insertFile(consumerbasket_data, str(self.last_id))
        
        return encoder.JSONEncoder().encode(id_data)
    
    index.exposed = True
    
    #-------------------------------------
    def get(self, consumerbasket_id, *args, **kwargs):
    #-------------------------------------	
        consumerbasket_data = self.database_obj.readFile(str(consumerbasket_id))

        return encoder.JSONEncoder().encode(consumerbasket_data)
    
    get.exposed = True
    
    #-------------------------------------
    def edit(self, consumerbasket_id, *args, **kwargs):
    #-------------------------------------
        cl = cherrypy.request.headers['Content-Length']
        rawbody = cherrypy.request.body.read(int(cl))
        consumerbasket_data = json.loads(str(rawbody)[2:-1])
        self.database_obj.editFile(consumerbasket_data, str(consumerbasket_data["id"]))
        
        return encoder.JSONEncoder().encode(consumerbasket_data)   
    
    edit.exposed = True
    
    #-------------------------------------
    def delete(self, consumerbasket_id, *args, **kwargs):
    #-------------------------------------
        self.database_obj.deleteFile(str(cherrypy.request.params["consumerbasket_id"]))
        
        return "success"
    
    delete.exposed = True
	
    #-------------------------------------
    def __getattr__(self, name):
    #-------------------------------------      		
        try:
            name = int(name)
            cherrypy.request.params["consumerbasket_id"] = name
            
            if cherrypy.request.method == "GET":
                return self.get
            elif cherrypy.request.method == "PUT":
                return self.edit
            elif cherrypy.request.method == "DELETE":
                return self.delete
        except:
            raise AttributeError("%r object has no attribute %r" % (self.__class__.__name__, name))
        
    