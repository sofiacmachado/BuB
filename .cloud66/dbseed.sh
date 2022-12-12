#!/bin/bash
cd $STACK_PATH
rake db:drop db:create db:migrate
rake db:seed
