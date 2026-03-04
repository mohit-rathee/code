import sys
import importlib


def main():
    if len(sys.argv) != 4:
        print("Usage: python run.py <day> <part>")
        print("Example: python run.py day1 part1")
        sys.exit(1)

    year = sys.argv[1]
    day = sys.argv[2]
    part = sys.argv[3]

    # Construct the module path
    module_path = f"{year}.{day}.{part}"
    input_path = f"{year}/{day}/input"

    try:
        # Dynamically import the module
        with open(input_path, "r") as file:
            module = importlib.import_module(module_path)

            # Check if the module has a main function
            if hasattr(module, "main"):
                print(f"Running {day}/{part}...")
                module.main(file)  # Call the main function
            else:
                print(f"Error: The module '{ module_path}' does not have a 'main()' function.")
    except ModuleNotFoundError:
        print(f"Error: Module '{module_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
