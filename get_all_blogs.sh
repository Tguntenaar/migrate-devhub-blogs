#!/bin/bash

# Array of post IDs
post_ids=(1993 1997 2015 2028 2029 2030 2032 2033 2035 2036 2037 2038 2067
          2309 2471 2473 2474 2478 2479 2480 2481 2496 2501 2502 2503 2504
          2505 2506 2507 2508 2509 2524 2553 2656 2657 2669 2670 2710 2766
          2767 2806 2807 2808 2809 2810 2846 2847 2848 2849 2850 2851 2920
          2933 2943 2953 2991 2992 2993 3018 3019 3020 3021 3022 3034 3040
          3081 3082 3101 3192 3193 3230 3231 3232 3233 3235 3237 3238 3240
          3241 3243 3244 3245 3246 3247 3248 3251 3272 3273 3274 3281 3282
          3283 3285 3286 3287 3288 3289 3292 3294 3295 3297 3298 3299 3301)

# Output file
output_file="posts.json"

# Initialize an empty array
echo "[]" > $output_file

# Loop through each post ID and fetch the post data
for post_id in "${post_ids[@]}"; do
  echo "Fetching post with ID: $post_id"
  post_json=$(near contract call-function as-read-only devgovgigs.near get_post json-args "{\"post_id\": $post_id}" network-config mainnet now)

  # Check if the near command was successful
  if [ $? -ne 0 ]; then
    echo "Failed to fetch post with ID: $post_id"
    continue
  fi

  # Append the fetched post JSON to the output file
  jq --argjson post "$post_json" '. += [$post]' $output_file > tmp.$$.json && mv tmp.$$.json $output_file
done

echo "All posts have been fetched and saved to $output_file"
