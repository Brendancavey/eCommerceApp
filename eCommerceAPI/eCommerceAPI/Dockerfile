#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY . .

RUN dotnet build "eCommerceAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build
ENV ASPNETCORE_HTTP_PORTS=8080
ENTRYPOINT ["dotnet", "run", "--urls", "http://0.0.0.0:8080", "eCommerceAPI.dll"]