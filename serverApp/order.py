#coding utf-8

import cherrypy
import json

from serverApp import database
from json import encoder

#-------------------------------------
class Order(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self):
    #-------------------------------------
        self.database_obj = database.Database("data\\orders\\")
        self.last_id = self.database_obj.readFile("id")["id"]
    
    #-------------------------------------
    def index(self, *arglist, **kwargs):
    #-------------------------------------
        # Increase next_id value in file
        self.last_id = self.last_id + 1
        id_data = {"id": self.last_id}
        self.database_obj.editFile(id_data, "id")
        
        order_obj = cherrypy.request.body.params
        self.database_obj.insertFile(order_obj, str(self.last_id))
        
        return encoder.JSONEncoder().encode(id_data)
        
    index.exposed = True
    
    #-------------------------------------
    def update(self, order_id, *args, **kwargs):
    #-------------------------------------
        cl = cherrypy.request.headers['Content-Length']
        rawbody = cherrypy.request.body.read(int(cl))
        order_obj = json.loads(str(rawbody)[2:-1])    
        
        self.database_obj.editFile(order_obj, str(order_id))
        
        return encoder.JSONEncoder().encode(order_obj)
    
    update.exposed = True
    
    #-------------------------------------
    def __getattr__(self, name):
    #-------------------------------------      		
        try:
            name = int(name)
            cherrypy.request.params["order_id"] = name
            return self.update
        except:
            raise AttributeError("%r object has no attribute %r" % (self.__class__.__name__, name))    