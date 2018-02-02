import React, {Component} from 'react';
// import Storage from '@google-cloud/storage';

import asyncRecognizeGCSWords from './speech'
import fire from './fire';


class FileList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [1,2,3]
        }
    }
    
    componentDidMount() {
        var db = fire.database().ref('/');
        db.on('value', snapshot => {
            console.log(snapshot.val());
        })
        
        /*
        // Instantiates a client. If you don't specify credentials when constructing
        // the client, the client library will look for credentials in the
        // environment.
        const storage = Storage({
            projectId: 'bkitano-gsl',
            keyFilename: '/home/ubuntu/workspace/service-account.json'
        });
        
        // Makes an authenticated API request.
        storage
            .getBuckets()
            .then((results) => {
            const buckets = results[0];
        
            console.log('Buckets:');
            buckets.forEach((bucket) => {
            console.log(bucket.name);
            });
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
        */
    }
    
    render() {
        
        return (
            <div>
                {this.state.data.map( (number) => {
                    return (
                    <div key={number}>
                        <h1>{number}</h1> 
                    </div>            
                    );
                })}
            </div>
        ); // end of return
    }
}

export default FileList;