<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCalendarSeasonsTable extends Migration
{

    public function up()
    {
        Schema::create('calendar_seasons', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 191)->unique();
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::drop('calendar_seasons');
    }
}
