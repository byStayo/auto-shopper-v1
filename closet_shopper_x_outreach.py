import os
import tweepy
import openai
import json
import time

# --- CONFIGURATION ---
# Replace these with your actual credentials or environment variables
TWITTER_API_KEY = "YOUR_TWITTER_API_KEY"
TWITTER_API_SECRET = "YOUR_TWITTER_API_SECRET"
TWITTER_ACCESS_TOKEN = "YOUR_TWITTER_ACCESS_TOKEN"
TWITTER_ACCESS_SECRET = "YOUR_TWITTER_ACCESS_SECRET"
TWITTER_BEARER_TOKEN = "YOUR_TWITTER_BEARER_TOKEN"

OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"

# Keywords to search for
SEARCH_KEYWORDS = [
    "Shopify wardrobe app",
    "wish there was an app for my closet",
    "organize my clothes app",
    "Shopify outfit builder",
    "clothing management app"
]

APP_URL = "https://closet-shopper-app.stelios.poke.site"

# --- INITIALIZATION ---
openai.api_key = OPENAI_API_KEY

def get_twitter_client():
    """Initializes the Tweepy client for Twitter API v2."""
    return tweepy.Client(
        bearer_token=TWITTER_BEARER_TOKEN,
        consumer_key=TWITTER_API_KEY,
        consumer_secret=TWITTER_API_SECRET,
        access_token=TWITTER_ACCESS_TOKEN,
        access_token_secret=TWITTER_ACCESS_SECRET,
        wait_on_rate_limit=True
    )

def draft_reply(tweet_text):
    """Uses OpenAI to draft a contextual, natural reply."""
    prompt = f"""
    The user tweeted: "{tweet_text}"
    
    I have built a web app called 'Closet Shopper' (URL: {APP_URL}) that is a mobile-first wardrobe scanner and outfit matcher.
    
    Draft a highly natural, helpful, and non-spammy reply to this tweet. 
    Acknowledge their pain point/interest and mention the app as a solution I just built.
    Keep it conversational, like a human founder reaching out, not a bot.
    """
    
    try:
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful, organic founder sharing a project you built."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error drafting reply: {e}")
        return None

def main():
    client = get_twitter_client()
    
    print("Starting X/Twitter outreach search...")
    
    for query in SEARCH_KEYWORDS:
        print(f"Searching for: {query}")
        # Search for recent tweets matching the query
        tweets = client.search_recent_tweets(
            query=f"{query} -is:retweet lang:en",
            tweet_fields=['text', 'author_id', 'created_at'],
            max_results=10
        )
        
        if not tweets.data:
            print(f"No results found for: {query}")
            continue
            
        for tweet in tweets.data:
            print(f"\nProcessing tweet: {tweet.text[:50]}...")
            
            # Draft the reply
            reply_text = draft_reply(tweet.text)
            
            if reply_text:
                print(f"Drafted Reply: {reply_text}")
                # NOTE: For safety and to avoid spam flags, this script only prints the draft.
                # To actually post, you would use:
                # client.create_tweet(text=reply_text, in_reply_to_tweet_id=tweet.id)
                print("--- [SIMULATED POSTING] ---")
            
            # Small delay to avoid hitting LLM/Twitter limits too fast
            time.sleep(2)

if __name__ == "__main__":
    main()
