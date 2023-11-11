import pandas as pd

# Read data from Excel file
df_Team2019 = pd.read_excel('src/components/Pages/Alumni/alumni_data.xlsx', sheet_name='2019')
df_Team2018 = pd.read_excel('src/components/Pages/Alumni/alumni_data.xlsx', sheet_name='2018')
df_sir = pd.read_excel('src/components/Pages/Alumni/alumni_data.xlsx', sheet_name='sir')

# Convert data to a list of dictionaries
Team2019 = df_Team2019.to_dict(orient='records')
Team2018 = df_Team2018.to_dict(orient='records')
sir = df_sir.to_dict(orient='records')

# Export the data to a JavaScript file
with open('TeamData.js', 'w') as file:
    file.write("const sir = ")
    file.write(str(sir))
    file.write(";\n\n")
    file.write("const Team2019 = ")
    file.write(str(Team2019))
    file.write(";\n\n")
    file.write("const Team2018 = ")
    file.write(str(Team2018))
    file.write(";\n\n")
    file.write("export { sir, Team2019, Team2018 }")

print("Data exported to TeamData.js")
