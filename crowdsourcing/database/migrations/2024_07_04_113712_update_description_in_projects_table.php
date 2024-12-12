<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateDescriptionInProjectsTable extends Migration
{
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('description', 1024)->change(); // Increase length to 1024 characters
        });
    }

    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('description', 255)->change(); // Revert back to 255 characters
        });
    }
}
