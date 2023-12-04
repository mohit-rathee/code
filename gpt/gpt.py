import openai
openai.api_key = "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"
query=input("Search: ")
prompt = str(query)
response = openai.Completion.create(engine="davinci",prompt=prompt, max_tokens=100)

print(response["choices"][0]["text"])

