# WooCommerce Shared

A React Native project used to share code between WooCommerce iOS and Android.

## Getting Started

This project uses `make` for most of its operations. You probably already have it installed if you've used your computer for development tasks in the past.

### Prerequisites

To work on this project, you'll need a JS runtime. The current JS version is in the repo's `.nvmrc` file, so if you have `nvm` installed, it'l just work. Otherwise, you'll need that version of `node` installed. If you're doing iOS development, you'll need Ruby installed – we recommend using `rbenv`, which will ensure that you're running the correct version of the tooling. Lastly, this project uses `yarn` as its package manager, so once you have `node` installed, you'll need to run `npm install -g yarn` to ensure the package manager is available everywhere.

### Setup

Run `make dev` to start working on this project locally.

## Build + Ship

Running `make` (with no other arguments) will build every component of the project (if possible on the current machine). See the `Makefile` for all of the individual build tasks involved in this.
