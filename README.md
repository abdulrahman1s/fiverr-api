## Simple API to retrieve your data on fiverr.com


### Usage
`https://abdulrahman1s-fiverr-api.deno.dev/{username}/reviews`
```json
[{
	"reviews_count_as_buyer": 1,
	"id": "****",
	"comment": "Very helpfull and very fast working!",
	"username": "*****",
	"user_image_url": "*****",
	"created_at": "2022-09-05T15:27:39",
	"value": 5,
	"reviewer_country_code": "US",
	"reviewer_country": "United Stats",
	"encrypted_order_id": "**********",
	"score": 0,
	"repeat_buyer": false,
	"is_business": false,
	"gig_id": 0,
	"relevancy_score": 0,
	"price_range_end": 0
}]
```


`https://abdulrahman1s-fiverr-api.deno.dev/{username}/gigs`
```json
[
  {
    "gig_id": 221463976,
    "category_id": 3,
    "sub_category_id": 371,
    "nested_sub_category_id": 0,
    "is_pro": false,
    "is_featured": false,
    "cached_slug": "",
    "title": "",
    "seller_name": "thepigg",
    "seller_id": 65155891,
    "seller_country": "US",
    "seller_img": "",
    "seller_online": false,
    "is_new_arrival": false,
    "status": "APPROVED",
    "assets": [
      ...
    ],
    "filtered_delivery_attachments": [...],
    "choice_eligibilities": null,
    "seller_languages": [
      {
        "code": "en",
        "level": 3
      }
    ],
    "recurring_options": null,
    "metadata": [
      {
        "type": "asset_type",
        "value": [
          "emotes_badges"
        ]
      },
      {
        "type": "streaming_platform",
        "value": [
          "twitch",
          "youtube",
          "discord"
        ]
      }
    ],
    "personalized_pricing_fail": false,
    "has_recurring_option": false,
    "buying_review_rating_count": 17,
    "buying_review_rating": 5,
    "seller_url": "",
    "seller_level": "",
    "gig_url": "",
    "is_seller_unavailable": false,
    "price_i": 5,
    "package_i": 1,
    "extra_fast": false,
    "num_of_packages": 3,
    "gigQueryParams": {}
  }
]
```

`https://abdulrahman1s-fiverr-api.deno.dev/{username}`
```json
{
  "user": {
    "id": 0,
    "username": "",
    "one_liner": null,
    "rating": 5,
    "achievement": null,
    "ratings_count": 17,
    "country": "United States",
    "member_since": 1505606400,
    "is_on_vacation": false,
    "is_pro": false,
    "is_seller": true,
    "has_profile_photo": true,
    "profile_photo": "",
    "custom_orders_allowed": true,
    "is_ambassador": false,
    "is_spotlight": false,
    "allow_contact": false,
    "response_time": 1,
    "recent_delivery": "1 day",
    "is_now_seller": false,
    "is_eligible_to_become_studio_member": false,
    "studio": null,
    "vacation_message": null,
    "vacation_end_date": null,
    "proficient_languages": [
      {
        "name": "en",
        "level": 3
      }
    ],
    "has_rising_talent_gigs": false,
    "country_code": "US"
  },
  "description": "",
  "skills": [...],
  "identities": [
    {
      "name": "google"
    }
  ],
  "languages": [
    {
      "name": "en",
      "level": 3
    }
  ]
}

```
