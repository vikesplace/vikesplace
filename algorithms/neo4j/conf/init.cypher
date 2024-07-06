CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE;
CREATE CONSTRAINT ON (l:Listing) ASSERT l.id IS UNIQUE;
CREATE (l:Listing {id: 'listing_' + '10000'});
