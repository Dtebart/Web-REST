#coding utf-8
import re
import cherrypy

from serverApp import database

#-------------------------------------
class Customer(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self):
    #-------------------------------------
        self.database_obj = database.Database("data\\customer\\")
        self.last_id = self.database_obj.readFile("id")["id"]
        
    #-------------------------------------
    def index(self, *arglist, **kwargs):
    #-------------------------------------
        # Increase next_id value in file
        self.last_id = self.last_id + 1
        id_data = {"id": self.last_id}
        self.database_obj.editFile(id_data, "id")
        
        customer_obj = cherrypy.request.body.params
        
        self.database_obj.insertFile(customer_obj, str(self.last_id))
        
        return str(id_data)
    
    index.exposed = True