<?php

namespace App\Http\Controllers\Admin;

use App\Anime\Anime;
use App\Genres\Genre;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;

class AnimeController extends Controller
{

    /**
     * @var Anime
     */
    private $anime;

    /**
     * @var Genre
     */
    private $genre;

    /**
     * @var Guard
     */
    private $auth;

    private $data;

    /**
     * @param Anime $anime
     * @param Genre $genre
     * @param Guard $auth
     */
    public function __construct(Anime $anime, Genre $genre, Guard $auth)
    {
        $this->anime = $anime;
        $this->genre = $genre;
        $this->auth = $auth;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $this->data['animes'] = $this->anime->orderBy('date', 'DESC')->get();
        $this->data['user'] = $this->auth->user();

        return view('admin.anime.index', $this->data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function getCreate()
    {
        $this->data['animes'] = $this->anime->orderBy('title', 'ASC')->get();
        $this->data['genres'] = $this->genre->orderBy('value', 'ASC')->get();
        $this->data['user'] = $this->auth->user();

        return view('admin.anime.create', $this->data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function postCreate(Request $request)
    {
        if ($request['position1'] && $request['position2']) {
            $position = "all";
        } elseif ($request['position1'] && !$request['position2']) {
            $position = "recently";
        } elseif (!$request['position1'] && $request['position2']) {
            $position = "featured";
        } else {
            $position = "none";
        }
        if ($request['image']) {
            try {
                $filename = rand(00000000, 99999999) . '_' . $request['image']->getClientOriginalName();
                $request['image']->move("images/", $filename);
                chmod(public_path("images/" . $filename), 0644);
            } catch (Exception $e) {
                dd($e);
            }
        }
        $this->anime->create([
            'title' => $request['title'],
            'slug' => str_slug($request['title']),
            'content' => $request['content'],
            'genres' => $request['genres'] ? implode(',', $request['genres']) : '',
            'episodes' => $request['episodes'],
            'type' => $request['type'],
            'type2' => $request['type2'],
            'age' => $request['age'],
            'status' => $request['status'],
            'prequel' => $request['prequel'],
            'sequel' => $request['sequel'],
            'story' => $request['story'],
            'side_story' => $request['side_story'],
            'spin_off' => $request['spin_off'],
            'other' => $request['other'],
            'alternative' => $request['alternative'],
            'position' => $position,
            'description' => $request['description'],
            'alternative_title' => $request['alternative_title'],
            'image' => $filename,
            'date' => time(),
            'date2' => time(),
            'rating' => 0,
            'visits' => 0,
            'votes' => 0,
        ]);
        $msg = 'Anime was created successfully!';

        return redirect()->action('Admin\AnimeController@index')->with('success', $msg);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\View\View
     */
    public function getEdit($id = 0)
    {
        $this->data['currentAnime'] = $this->anime->findOrFail($id);
        $this->data['animes'] = $this->anime->orderBy('title', 'ASC')->get();
        $this->data['genres'] = $this->genre->orderBy('value', 'ASC')->get();
        $this->data['user'] = $this->auth->user();

        return view('admin.anime.edit', $this->data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function postEdit($id = 0, Request $request)
    {
        $anime = $this->anime->findOrFail($id);
        $anime->title = $request['title'];
        $anime->slug = str_slug($request['title']);
        $anime->episodes = $request['episodes'];
        $anime->type = $request['type'];
        $anime->type2 = $request['type2'];
        $anime->age = $request['age'];
        $anime->status = $request['status'];
        $anime->prequel = $request['prequel'];
        $anime->sequel = $request['sequel'];
        $anime->story = $request['story'];
        $anime->side_story = $request['side_story'];
        $anime->spin_off = $request['spin_off'];
        $anime->alternative = $request['alternative'];
        $anime->other = $request['other'];
        $anime->genres = $request['genres'] ? implode(',', $request['genres']) : '';
        $anime->description = $request['description'];
        $anime->alternative_title = $request['alternative_title'];
        $anime->content = $request['content'];
        if ($request['position1'] && $request['position2']) {
            $anime->position = "all";
        } elseif ($request['position1'] && !$request['position2']) {
            $anime->position = "recently";
        } elseif (!$request['position1'] && $request['position2']) {
            $anime->position = "featured";
        } else {
            $anime->position = "none";
        }
        if ($request['new_image']) {
            try {
                $filename = rand(00000000, 99999999) . '_' . $request['new_image']->getClientOriginalName();
                $request['new_image']->move("images", $filename);
                if (file_exists(public_path("images/" . $request['image']))) {
                    unlink(public_path("images/" . $request['image']));
                }
                $anime->image = $filename;
            } catch (Exception $e) {
                dd($e);
            }
        }
        $anime->save();
        $msg = 'Anime was updated successfully!';

        return redirect()->to($request['previous_url'])->with('success', $msg);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getDelete($id = 0)
    {
        $anime = $this->anime->findOrFail($id);
        unlink(public_path("images/" . $anime['image']));
        $anime->delete();
        $msg = 'Anime was deleted successfully!';

        return redirect()->action('Admin\AnimeController@index')->with('success', $msg);
    }
}
