Deploying to GCP
================

You need to create the following items, in the same region:

- A Cloud Storage bucket that's world readable
- A Cloud SQL Postgres instance
- A Kubernetes cluster, with 'VPC Native' enabled

Then you need to create a service account with cloud storage writer rights
attached, and download the JSON file.

Get the Cloud SQL Proxy, connect an SQL editor, and create the database,
and the role that the application uses. Then run 'schema.sql' (found in ../database) 
on the database, and make sure to:

    GRANT ALL PRIVILEGES ON TABLE entries TO [name of your role];

At this point, fill out the secrets yml file with the base64 encoded
versions of your database's jdbc URL, role name, and password. 

Use the CLI to create a secret named `gcs-key` which holds the service
account's JSON file:

    kubectl create secret generic gcs-key --from-file=key.json=gcs.json

Create a global IP that the ingress can bind to, its name should be
'guestbook-ip':

    gcloud compute addresses create guestbook-ip --global

At this point, you should be able to apply the three yml files, and 
things should work.

Should.
