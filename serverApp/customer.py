#coding utf-8
import os
import re
import cherrypy

from serverApp import database
from json import encoder

#-------------------------------------
class Customer(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self):
    #-------------------------------------
        self.database_obj = database.Database("data\\customer\\")
        self.last_id = self.database_obj.readJSON("id")["id"]
        
    #-------------------------------------
    def index(self, *arglist, **kwargs):
    #-------------------------------------
        newCustomer_obj = cherrypy.request.body.params
        
        fileList_obj = os.listdir(self.database_obj.rootdir_str)
        
        for customerFile_str in fileList_obj:
            if not customerFile_str.startswith("id"):
                oldCustomer_obj = self.database_obj.readJSON(customerFile_str[:-5])
                if (oldCustomer_obj == newCustomer_obj):
                    raise cherrypy.HTTPError("405", "Anfrage nicht zugelassen: Benutzer existiert bereits")
                
        
        # Increase next_id value in file
        self.last_id = self.last_id + 1
        id_data = {"id": self.last_id}
        self.database_obj.editFile(id_data, "id")
        
        self.database_obj.insertFile(newCustomer_obj, str(self.last_id))
        
        return encoder.JSONEncoder().encode(id_data)
    
    index.exposed = True