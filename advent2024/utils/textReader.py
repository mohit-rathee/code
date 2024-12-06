def textReader(inputFile):
    with open("inputs/" + inputFile, "r") as f:
        text = f.readlines()
    return text[0]
