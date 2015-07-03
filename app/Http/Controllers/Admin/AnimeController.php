<?php

namespace App\Http\Controllers\Admin;

use App\Anime\Anime;
use App\Genres\Genre;
use Illuminate\Auth\Guard;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
     * @return Response
     */
    public function index()
    {
        $this->data['animes'] = $this->anime->orderBy('title', 'ASC')->get();
        $this->data['user'] = $this->auth->user();

        return view('admin.anime.index', $this->data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
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
        // $this->validate($request, $this->rules);
        $this->anime->create([
            'name' => $request['title'],
            'slug' => str_slug($request['title']),
            'content' => $request['content'],
            'genres' => implode(',', $request['photo']),
            'episodes' => $request['episodes'],
            'type' => $request['type'],
            'age' => $request['age'],
            'type2' => $request['type2'],
            'status' => $request['status'],
            'prequel' => $request['prequel'],
            'sequel' => $request['sequel'],
            'story' => $request['story'],
            'side_story' => $request['side_story'],
            'spin_off' => $request['spin_off'],
            'alternative' => $request['alternative'],
            'position' => $request['position'],
            'description' => $request['description'],
            'alternative_title' => $request['alternative_title'],
            'image' => $request['image'],
            'rating' => $request['rating'],
            'votes' => $request['votes'],
            'visits' => $request['visits'],
            'date' => $request['date'],
            'date2' => $request['date2']
        ]);
        $msg = 'Anime was created successfully!';

        return redirect()->action('Admin\AnimeController@index')->with('success', $msg);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function getEdit($id = 0)
    {
        $this->data['currentAnime'] = $this->anime->findorFail($id);
        $this->data['animes'] = $this->anime->orderBy('title', 'ASC')->get();
        $this->data['genres'] = $this->genre->orderBy('value', 'ASC')->get();
        $this->data['user'] = $this->auth->user();

        return view('admin.anime.edit', $this->data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @param Request $request
     * @return Response
     */
    public function postEdit($id = 0, Request $request)
    {
        $anime = $this->anime->findOrFail($id);
        $anime->title = $request['title'];
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
        $anime->genres = implode(',', $request['genres']);
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
        $msg = 'Anime was updated successfully!';
        $anime->save();

        return redirect()->action('Admin\AnimeController@index')->with('success', $msg);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
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
