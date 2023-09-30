# Use the official PostgreSQL image as the base image
FROM postgres:16

# Install PostGIS and other dependencies
RUN apt-get update && apt-get install -y \
    postgresql-16-postgis-3 \
    postgresql-16-postgis-3-scripts

# Set environment variables for PostGIS
ENV POSTGIS_MAJOR 3
ENV POSTGIS_VERSION 3.2.1

# Create a symlink for the PostGIS control file
RUN ln -s /usr/share/postgresql/16/extension/postgis.control /usr/share/postgresql/16/extension/postgis--16.control
