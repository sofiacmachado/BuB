#!/bin/bash
cd $STACK_PATH
bundle exec rake db:drop db:create db:migrate
bundle exec rake db:seed
