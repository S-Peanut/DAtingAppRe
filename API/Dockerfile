FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app
EXPOSE 8080

# copy csproj and restore a distinct layers

COPY *.csproj ./
RUN dotnet restore


#copy everything and build
COPY . ./
RUN dotnet publish -c Release -o out

#Builed runtime image 
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll" ]
