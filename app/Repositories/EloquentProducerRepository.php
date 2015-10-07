<?php

namespace AC\Repositories;

use AC\Models\Producer;
use Carbon\Carbon;

class EloquentProducerRepository
{
    /**
     * @var Producer
     */
    private $producer;

    /**
     * @param Producer $producer
     */
    public function __construct(Producer $producer)
    {
        $this->producer = $producer;
    }

    public function all()
    {
        return $this->producer->whereHas('animes', function ($query) {
            $query->has('episodes')->where('release_date', '<', Carbon::now()->toDateTimeString());
        })->get(['id', 'name']);
    }
}