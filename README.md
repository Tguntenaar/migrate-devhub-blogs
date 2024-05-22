# Migration of Devhub blogs

This repositories contains a few scripts to migrate the blogs from devgovgigs.near contract to socialDB.




Get all blogs ids
```bash
near contract call-function as-read-only devgovgigs.near get_posts_by_label json-args '{"label": "blog"}' network-config mainnet now
```

Get data from a single id
```bash
near contract call-function as-read-only devgovgigs.near get_post json-args '{"post_id": 1993}' network-config mainnet now
```

# Execute final step


1. Edit `migrate_blogs.js` with the right username (must be a devhub moderator)
2. Run `node migrate_blogs.js`


# From the start Step by step
1. Get all Blog Ids with get_posts_by_label command from above
2. Put the ids in `get_all_blog.sh`
3. Run `./get_all_blogs.sh` this will create `posts.json`
4. Rename `posts.json` to `all_blog_posts.json`
5. Remove the `socialdb-structure.json` if you already did this once
6. Run `node convert_all.js` to create `socialdb-structured.json`
7. Edit `migrate_blogs.js` to contain your username. 
8. You can also test it with `devhub-test-migrate.json` or `webassemblymusic.json`