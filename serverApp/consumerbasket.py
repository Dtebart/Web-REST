#coding utf-8

import cherrypy
import json
import re
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
        
        return str(id_data)
    
    index.exposed = True
    
    #-------------------------------------
    def get_consumerbasket(self, consumerbasket_id, *arglist, **kwargs):
    #-------------------------------------	
        article_data = cherrypy.request.body.params
        if cherrypy.request.method == "PUT":
            consumerbasket_data = self.database_obj.readFile(str(consumerbasket_id))        
            # Rewrite basket-data
            if article_data["number"] in consumerbasket_data["articles"]:
                consumerbasket_data["articles"][article_data["number"]]["quantity"]+=1
            else:
                consumerbasket_data["articles"][article_data["number"]] = {"name":article_data["name"], "price":article_data["price"], "quantity": 1}	
				
            self.database_obj.editFile(consumerbasket_data, str(consumerbasket_data["id"]))

        elif cherrypy.request.method == "DELETE":
            self.database_obj.deleteFile({"id": cherrypy.request.params["consumerbasket_id"]})

        elif cherrypy.request.method == "GET":
            consumerbasket_data = str(self.database_obj.readFile(str(consumerbasket_id))) 
            return consumerbasket_data
			
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
        
    