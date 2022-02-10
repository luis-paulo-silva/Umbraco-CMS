/**
 * @ngdoc service
 * @name umbraco.resources.trackedReferencesResource
 * @description Loads in data for tracked references
 **/
function trackedReferencesResource($q, $http, umbRequestHelper) {

    return {
        
        /**
         * @ngdoc method
         * @name umbraco.resources.trackedReferencesResource#getPagedReferences
         * @methodOf umbraco.resources.trackedReferencesResource
         *
         * @description
         * Gets a page list of tracked references for the current item, so you can see where an item is being used
         *
         * ##usage
         * <pre>
         * var options = {
         *      pageSize : 25,
         *      pageNumber : 1,
         *      entityType : 'DOCUMENT'
         *  };
         * trackedReferencesResource.getPagedReferences(1, options)
         *    .then(function(data) {
         *        console.log(data);
         *    });
         * </pre>
         *
         * @param {int} id Id of the item to query for tracked references
         * @param {Object} args optional args object
         * @param {Int} args.pageSize the pagesize of the returned list (default 25)
         * @param {Int} args.pageNumber the current page index (default 1)
         * @param {String} args.entityType the type of tracked entity (default : DOCUMENT). Possible values DOCUMENT, MEDIA
         * @returns {Promise} resourcePromise object.
         *
         */
        getPagedReferences: function (id, args) {

            var defaults = {
                pageSize: 10,
                pageNumber: 1,
                entityType: "DOCUMENT"
            };
            if (args === undefined) {
                args = {};
            }

            //overwrite the defaults if there are any specified
            var options = Utilities.extend(defaults, args);
          
            return umbRequestHelper.resourcePromise(
                $http.get(
                    umbRequestHelper.getApiUrl(
                        "trackedReferencesApiBaseUrl",
                        "GetPagedReferences",
                        {
                            id: id,
                            entityType: options.entityType,
                            pageNumber: options.pageNumber,
                            pageSize: options.pageSize
                        }
                    )),
                "Failed to retrieve usages for entity of id " + id);
        },

        /**
         * @ngdoc method
         * @name umbraco.resources.trackedReferencesResource#hasReferencesInDescendants
         * @methodOf umbraco.resources.trackedReferencesResource
         *
         * @description
         * Checks if there are any tracked references for the child nodes of the current item
         *
         * ##usage
         * <pre>         
         * trackedReferencesResource.hasReferencesInDescendants(1,'MEDIA')
         *    .then(function(data) {
         *        console.log(data);
         *    });
         * </pre>
         *
         * @param {int} id Id of the item to query for tracked references
         * @param {String} entityType the type of tracked entity (default : DOCUMENT). Possible values DOCUMENT, MEDIA
         * @returns {Promise} resourcePromise object.
         *
         */
        hasReferencesInDescendants: function (id, entityType) {

            return umbRequestHelper.resourcePromise(
                $http.get(
                    umbRequestHelper.getApiUrl(
                        "trackedReferencesApiBaseUrl",
                        "HasReferencesInDescendants",
                        {
                            id: id,
                            entityType: entityType
                        }
                    )),
                "Failed to check for references in child nodes");
        },

        /**
         * @ngdoc method
         * @name umbraco.resources.trackedReferencesResource#checkLinkedItems
         * @methodOf umbraco.resources.trackedReferencesResource
         *
         * @description
         * Checks if any of the items are used in a relation and returns a page list, so you can see which items are being used
         *
         * ##usage
         * <pre>
         * var ids = [123,3453,2334,2343];
         * var options = {
         *      pageSize : 25,
         *      pageNumber : 1,
         *      entityType : 'DOCUMENT'
         *  };
         *  
         * trackedReferencesResource.checkLinkedItems(ids, options)
         *    .then(function(data) {
         *        console.log(data);
         *    });
         * </pre>
         * 
         * @param {Array} ids array of the selected items ids to query for references
         * @param {Object} options optional options object
         * @param {Int} options.pageSize the pagesize of the returned list (default 25)
         * @param {Int} options.pageNumber the current page index (default 1)
         * @param {String} options.entityType the type of tracked entity (default : DOCUMENT). Possible values DOCUMENT, MEDIA
         * @returns {Promise} resourcePromise object.
         *
         */
        checkLinkedItems: function (ids, options) {
            var query = `entityType=${options.entityType}&pageNumber=${options.pageNumber}&pageSize=${options.pageSize}`;

            return umbRequestHelper.resourcePromise(
                $http.post(
                    umbRequestHelper.getApiUrl(
                        "trackedReferencesApiBaseUrl",
                        "CheckLinkedItems",
                        query),
                        {
                            ids: ids,
                            entityType: options.entityType,
                            pageNumber: options.pageNumber,
                            pageSize: options.pageSize
                        }),
                "Failed to check for references of nodes with ids " + ids);
        }
    }
}

angular.module('umbraco.resources').factory('trackedReferencesResource', trackedReferencesResource);