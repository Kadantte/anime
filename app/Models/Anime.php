<?php

namespace AC\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

/**
 * AC\Models\Anime
 *
 * @property integer $id
 * @property integer $mal_id
 * @property string $title
 * @property string $slug
 * @property string $image
 * @property string $synopsis
 * @property integer $type_id
 * @property \Illuminate\Database\Eloquent\Collection|Episode[] $episodes
 * @property string $status
 * @property string $release_date
 * @property string $end_date
 * @property string $duration
 * @property integer $season_id
 * @property integer $classification_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|Genre[] $genres
 * @property-read Type $type
 * @method static Builder|Anime whereId($value)
 * @method static Builder|Anime whereMalId($value)
 * @method static Builder|Anime whereTitle($value)
 * @method static Builder|Anime whereSlug($value)
 * @method static Builder|Anime whereImage($value)
 * @method static Builder|Anime whereSynopsis($value)
 * @method static Builder|Anime whereTypeId($value)
 * @method static Builder|Anime whereEpisodes($value)
 * @method static Builder|Anime whereStatus($value)
 * @method static Builder|Anime whereReleaseDate($value)
 * @method static Builder|Anime whereEndDate($value)
 * @method static Builder|Anime whereDuration($value)
 * @method static Builder|Anime whereSeasonId($value)
 * @method static Builder|Anime whereClassificationId($value)
 * @method static Builder|Anime whereCreatedAt($value)
 * @method static Builder|Anime whereUpdatedAt($value)
 * @method static Builder|Anime whereDeletedAt($value)
 */
class Anime extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'animes';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var string[]
     */
    protected $hidden = [''];

    /**
     * The attributes that aren't mass assignable.
     *
     * @var string[]
     */
    protected $guarded = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var string[]
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes that should be casted to native types.
     *
     * @var string[]
     */
    protected $casts = [
        'id'                => 'int',
        'mal_id'            => 'int',
        'title'             => 'string',
        'slug'              => 'string',
        'image'             => 'string',
        'synopsis'          => 'string',
        'type_id'           => 'int',
        'episodes'          => 'int',
        'status'            => 'string',
        'release_date'      => 'date',
        'end_date'          => 'date',
        'duration'          => 'float',
        'season_id'         => 'int',
        'classification_id' => 'int'
    ];

    /**
     * The validation rules.
     *
     * @var string[]
     */
    public $rules = [
        'id' => 'required|integer|min:1'
    ];

    /**
     * Get all episodes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function episodes()
    {
        return $this->hasMany(Episode::class, 'anime_id');
    }

    /**
     * Get all genres.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'anime_genre', 'anime_id', 'genre_id');
    }

    /**
     * Get type.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id', 'id');
    }
}
