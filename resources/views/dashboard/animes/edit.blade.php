@extends('dashboard.layouts.main')

@section('title')
    Edit anime
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <form role="form" method="post" action="{{ url('dashboard/animes/edit/' . $anime->id) }}">
                        {!! csrf_field() !!}
                        <div class="form-group">
                            <label for="mal_id">MAL ID</label>
                            <input type="number" class="form-control" name="mal_id" value="{{
                                ArrayHelper::get_first_value_in_array([old('mal_id'), $anime->mal_id]) }}" placeholder="MAL ID">
                        </div>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" name="title" value="{{
                                ArrayHelper::get_first_value_in_array([old('title'), $anime->title]) }}" placeholder="Title">
                        </div>
                        <div class="form-group">
                            <label for="slug">Slug</label>
                            <input type="text" class="form-control" name="slug" value="{{
                                ArrayHelper::get_first_value_in_array([old('slug'), $anime->slug]) }}" placeholder="Slug">
                        </div>
                        <div class="form-group">
                            <label for="synopsis">Synopsis</label>
                            <textarea class="form-control" name="synopsis" cols="30" rows="10" placeholder="Synopsis">{{
                                ArrayHelper::get_first_value_in_array([old('synopsis'), $anime->synopsis]) }}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="type_id">Select Type</label>
                            <select name="type_id" class="form-control">
                                @foreach ($types as $type)
                                    <option value="{{ $type->id }}" {{
                                    FormHelper::option_is_selected([$type, 'type_id', $anime])
                                    }}>{{ $type->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="number_of_episodes">Number of Episodes</label>
                            <input type="number" class="form-control" name="number_of_episodes" value="{{
                                ArrayHelper::get_first_value_in_array([old('number_of_episodes'), $anime->number_of_episodes]) }}"
                                   placeholder="Number of Episodes">
                        </div>
                        <div class="form-group">
                            <label for="status_id">Select Status</label>
                            <select name="status_id" class="form-control">
                                @foreach ($statuses as $status)
                                    <option value="{{ $status->id }}" {{ FormHelper::option_is_selected([$status, 'status_id', $anime]) }}>{{ $status->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="release_date">Release Date</label>
                            <input type="date" class="form-control" name="release_date" value="{{
                                ArrayHelper::get_first_value_in_array([old('release_date'), $anime->release_date]) }}" placeholder="Release Date">
                        </div>
                        <div class="form-group">
                            <label for="end_date">End Date</label>
                            <input type="date" class="form-control" name="end_date" value="{{
                                ArrayHelper::get_first_value_in_array([old('end_date'), $anime->end_date]) }}" placeholder="End Date">
                        </div>
                        <div class="form-group">
                            <label for="duration">Duration Hours:minutes</label>
                            <input type="time" class="form-control" name="duration" value="{{
                                ArrayHelper::get_first_value_in_array([old('duration'), $anime->duration]) }}" placeholder="Duration">
                        </div>
                        <div class="form-group">
                            <label for="calendar_season_id">Select Calendar Season</label>
                            <select name="calendar_season_id" class="form-control">
                                @foreach ($calendarSeasons as $calendarSeason)
                                    <option value="{{ $calendarSeason->id }}" {{
                                        FormHelper::option_is_selected([$calendarSeason, 'calendar_season_id', $anime]) }}>{{
                                        $calendarSeason->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="classification_id">Select Classification</label>
                            <select name="classification_id" class="form-control">
                                @foreach ($classifications as $classification)
                                    <option value="{{ $classification->id }}" {{
                                        FormHelper::option_is_selected([$classification, 'classification_id', $anime]) }}>{{
                                        $classification->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Status:</label>
                            <label class="checkbox-inline">
                                <input type="checkbox" class="checkbox" name="active" value="1" {{
                                FormHelper::checkbox_is_active('active', $anime) }}>
                                Active
                            </label>
                        </div>
                        <button type="submit" class="btn btn-success">Save</button>
                        <a href="{{ url('dashboard/animes') }}" class="btn btn-default">Go back</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection