import cherrypy
import os

from serverApp import database
from json import encoder

#-------------------------------------
class Admin(object):
#-------------------------------------

    #----------------------------
    def __init__(self):
    #----------------------------
        self.database_obj = database.Database("templates\\")
    
    #----------------------------
    def index(self):
    #----------------------------
        self.database_obj = database.Database("content\\")	
        return self.database_obj.readFile("admin.html")

    index.exposed = True
