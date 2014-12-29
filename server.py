#coding: utf-8

import os
import cherrypy

from serverApp import application

#----------------------------
def main():
#----------------------------
    #Get current directory
    
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
    except:
        current_dir = os.path.dirname(os.path.abspath(sys.executable))
        
    # disable autoreload an timeout_monitor
    cherrypy.engine.autoreload.unsubscribe()
    cherrypy.engine.timeout_monitor.unsubscribe()
    
    # Static content config
    static_config = {
        '/': {
            'tools.staticdir.root': current_dir,
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './content',
            'tools.staticdir.index': 'index.html'
        }
    }
    
    # Mount static content handler
    root_o = cherrypy.tree.mount(application.Application_cl(), '/', static_config)
    
    # suppress traceback-info
    cherrypy.config.update({'request.show_tracebacks': False})
    cherrypy.config.update({'server.socket_port': 8080}) # port 8080
    
    # Start server
    cherrypy.engine.start()
    cherrypy.engine.block()
    
#----------------------------
if __name__ == '__main__':
#----------------------------
    main()
# EOF
