#coding utf-8

import cherrypy
import os

from serverApp import database
from json import encoder

#----------------------------
class Template(object):
#----------------------------
    
    #----------------------------
    def __init__(self):
    #----------------------------
        self.database_obj = database.Database("templates\\")
    
    #----------------------------
    def index(self):
    #----------------------------
        templateList_obj = {"templates" : {}}
        
        fileList_obj = os.listdir(self.database_obj.rootdir_str)
        
        for templateFile_str in fileList_obj:
            code = self.database_obj.readFile(templateFile_str)
            templateList_obj["templates"][templateFile_str] = code
        
        return encoder.JSONEncoder().encode(templateList_obj)
    
    index.exposed = True
            
            
        