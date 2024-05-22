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


# Step by step
1. Get all Blog Ids with get_posts_by_label command from above
2. put the ids in get_all_blog.sh
3. run `./get_all_blogs.sh` this will create posts.json
4. rename posts.json to `all_blog_posts.json`
5. remove the `socialdb-structure.json` if you already did this once
6. run `node convert_all.js` to create `socialdb-structured.json`
7. edit `migrate_blogs.js` to contain your username. 
8. you can also test it with `devhub-test-migrate.json` or `webassemblymusic.json`