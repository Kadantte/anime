<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTitlesTable extends Migration
{

    public function up()
    {
        Schema::create('titles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 191)->unique();
            $table->string('language');
            $table->integer('titlable_id')->unsigned();
            $table->string('titlable_type', 15);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::drop('titles');
    }
}
