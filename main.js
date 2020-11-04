"use strict"
class VisualController {
    constructor ( dependencies ) {
              const { eBus } = dependencies;
              const cache = {}  // collect vue components
              this.dependencies = { ...dependencies }
              if ( !eBus )   console.error ( 'eBus is required' )
              return {
                          publish : this.publish ( dependencies, cache )
                        , destroy : this.destroy ( cache )
                        , getApp  : this.getApp  ( cache )
                    }
        }
    publish ( dependencies, cache ) {
        return function (component, data, id) {
                const 
                        hasKey = this.destroy ( id )
                    , { eBus, Vue } = dependencies
                    ;
                let node;
                if ( !component ) {
                        console.error ( `Error: Component is undefined` )
                        return false
                   }
                if ( !hasKey ) {   // if container is not registered before 
                        node = document.getElementById ( id )
                        if ( !node ) {  
                                    console.error ( `Can't find node with id: "${id}"`)
                                    return false
                            }
                    }
                let v = new Vue ({ render: h => h( component, {props:{eBus, containerID:id, ...data}}) }).$mount (`#${id}`)
                cache[id] = v.$children[0]
                return true
            }} // publish func.
    destroy ( cache ) {
        return function (id) {
                const htmlKeys = Object.keys(cache);
                if ( htmlKeys.includes(id) ) {                    
                        let node = document.getElementById ( id );
                        node.innerHTML = ''
                        cache[id].$destroy ()
                        delete cache[id]
                        return true
                    }
                else    return false
            }} // destroy func.
    getApp ( cache ) {
        return function (id) {
                const item = cache[id];
                if ( !item ) {  
                        console.error ( `App with id: "${id}" was not found.`)
                        return false
                    }
                return item
        }} // getApp func.
} // visualController



export default VisualController


