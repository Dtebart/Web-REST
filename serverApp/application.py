# coding: utf-8

import cherrypy
import json
import os

#-------------------------------------
class Application_cl(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self):
    #-------------------------------------
        # constructor
        pass
    
    #-------------------------------------
    def default(self, *arglist, **kwargs):
    #-------------------------------------
        # Return an error message
        msg_s = "unbekannte Anforderung: " + \
              str(arglist) + \
              ' ' + \
              str(kwargs)
        raise cherrypy.HTTPError(404, msg_s)
    
    default.exposed = True


# EOF
            