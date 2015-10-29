<?php

namespace AC\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\Builder;

/**
 * AC\Models\Producer
 *
 * @property integer $id
 * @property string $name
 * @property boolean $active
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|Anime[] $animes
 * @method static Builder|Producer whereId($value)
 * @method static Builder|Producer whereName($value)
 * @method static Builder|Producer whereActive($value)
 * @method static Builder|Producer whereCreatedAt($value)
 * @method static Builder|Producer whereUpdatedAt($value)
 * @method static Builder|Producer whereDeletedAt($value)
 */
class Producer extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'producers';

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
        'id'     => 'int',
        'name'   => 'string',
        'active' => 'boolean'
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
     * Get all animes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function animes()
    {
        return $this->belongsToMany(Anime::class, 'anime_producer', 'producer_id', 'anime_id');
    }
}
